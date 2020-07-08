const db = require("../config/db");
const { inRange, serverError, isAreaCoordinatesValid } = require("../util");

exports.getUltimaLocalizacao = async (req, res) => {
    const uid = req.params.uid;
    const client = await db.connect();
    try {
        const sql = `SELECT LD.id, D.uid, D.bloqueado, LD.latitude, LD.longitude, LD.data_hora_ultima_atualizacao
                    FROM dispositivo as D
                    LEFT JOIN localizacao_dispositivo as LD on LD.uid = D.uid
                    WHERE D.uid = $1
                    order by LD.id desc limit 1`;
        const resultado = await client.query(sql, [uid]);

        if(resultado.rowCount === 0) { 
            return res.status(404).send({message: 'Dispositivo não localizado!'});
        }

        if(resultado.rows[0].bloqueado){
            return res.status(401).send({message: 'Dispositivo bloqueado!'});
        }

        if(resultado.rows[0].id){
            delete resultado.rows[0].bloqueado;
            res.status(200).send(resultado.rows[0]);             
        }
        else { res.status(404).send({message: 'Nenhuma localização ainda registrada para o dispositivo!'}); }
    } catch (error) {
        serverError(res, error);
    } finally{
        client.end();
    }
};

exports.getUltimaLocalizacaoTodos = async (req, res) => {
    const client = await db.connect();
    try {
        const seconds = 60 * 5; 
        const sql = 
            `select latitude, longitude 
             from localizacao_dispositivo l where l.id = 
             (select max(l2.id) from localizacao_dispositivo as l2 
              where l2.uid = l.uid and 
              extract(epoch from (current_timestamp - l2.data_hora_ultima_atualizacao)) <= $1)`;
        const resultado = await client.query(sql, [seconds]);

        res.status(200).send(resultado.rows);
    } catch (error) {
        serverError(res, error);
    } finally{
        client.end();
    }
};

exports.getFrequenciaMediaVisitantas = async (req, res) => {
    const area = (req.params.area).split(',');
    const lat1 = area[0], lng1 = area[1], lat2 = area[2], lng2 = area[3];

    if(!isAreaCoordinatesValid( lat1, lat2 )){
        res.status(422).send({message: 'Valor de Latitude1 deve ser menor que valor de Latitude2!'});
        return;
    }

    if(!isAreaCoordinatesValid( lng1, lng2 )){
        res.status(422).send({message: 'Valor de Longitude1 deve ser menor que valor de Longitude2!'});
        return;
    }

    const frequenciaMedia = {hora:null, dia:null, semana:null, mes:null};

    const client = await db.connect();
    try {
        const sql2 = `SELECT uid, EXTRACT(HOUR from data_hora_ultima_atualizacao) as horas, count(*) as ocorrencias
        FROM localizacao_dispositivo
        WHERE (latitude BETWEEN $1 AND $2) AND (longitude BETWEEN $3 AND $4) 
        group by 1, 2; `;
        const resultado = await client.query(sql2, [lat1, lat2, lng1, lng2]);

        const horasArray = resultado.rows.map(row => row.horas);

        var horaSet = new Set(horasArray);

        frequenciaMedia.hora = resultado.rowCount / horaSet.size;

        return res.status(200).json(frequenciaMedia);
     } catch (error) {
        serverError(res, error);
    } finally{
        client.end();
    }
}

exports.inserir = async (req, res) => {
    const { uid, lat, long } = req.params;

    if( !inRange( lat, -90, 90 ) ) {
        res.status(422).send({message: 'Valor de Latitude deve estar entre -90 e 90!'});
        return;
    }

    if(!inRange( long, -180, 180 ) ) {
        res.status(422).send({message: 'Valor de Longitude deve estar entre -180 e 180!'});
        return;
    }

    const client = await db.connect();
    try {
        const sql = 'SELECT bloqueado FROM dispositivo WHERE uid = $1 ';
        const resultado = await client.query(sql, [uid]);

        if(resultado.rowCount === 0) {
            return res.status(404).send({message: 'Dispositivo não localizado!'});
        }

        if(resultado.rows[0].bloqueado) {
            res.status(404).send({message: 'Dispositivo bloqueado!'});
        } else {
            const sql = 'INSERT INTO localizacao_dispositivo (uid, latitude, longitude) VALUES ($1, $2, $3)';
            await client.query(sql, [uid, lat, long]);
            res.status(201).send({message: 'Localização inserida com Sucesso!'});
        }
     } catch (error) {
        if(error.message.includes('fk_localizacao_dispositivo'))
            res.status(403).send({message: 'Dispositivo não cadastrado!'});
        else serverError(res, error);
    } finally{
        client.end();
     }
};


