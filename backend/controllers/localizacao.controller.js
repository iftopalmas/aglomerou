const db = require("../db/config");

exports.getUltimaLocalizacao = async (req, res) => {
    try {
        const resultado = await db.query(
            " SELECT id, latitude, longitude, data_hora_ultima_atualizacao " +
            " FROM localizacao_dispositivo " +
            " WHERE id_dispositivo = $1 order by id desc limit 1",
            [req.params.idDispositivo]);

            if(resultado.rows.length > 0)
                res.status(200).send(resultado.rows[0]);
            else res.status(404).send({message: "Dispositivo não localizado!"});
    } catch (error) {
        res.status(400).send({message: error.messge});
        console.error(error.message, error.stack);
    }
};

exports.inserir = async (req, res) => {
    const idDispositivo = req.params.idDispositivo;
    const lat = req.params.lat;
    const long = req.params.long;

    try {
        if( !inRange( lat, -90, 90 ) ) {
            res.status(404).send({message: "Valor de Latitude deve estar entre -90 e 90!"});
            return;
        }

        if(!inRange( long, -180, 180 ) ) {
            res.status(404).send({message: "Valor de Longitude deve estar entre -180 e 180!"});
            return;
        }

        const result = await db.query(
            " INSERT INTO localizacao_dispositivo ( id_dispositivo, latitude, longitude) " +
            " VALUES ( $1, $2, $3 )",
            [idDispositivo, lat, long]
        );

        res.status(201).send({message: "Local inserido com Sucesso!"});
     } catch (error) {
        if(error.message.includes('fk_localizacao_dispositivo')){
            res.status(401).send({message: "Falha ao inserir localização, dispositivo não cadastrado!"});
        }
        
        console.error(error.message);
     }
};

function inRange(number, min, max) { return ( ( number - min ) * ( number - max ) <= 0 ); }

