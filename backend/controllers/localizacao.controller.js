const db = require("../config/db");
const { inRange, serverError } = require("../util");

exports.getUltimaLocalizacao = async (req, res) => {
    const client = await db.connect();
    try {
        const resultado = await client.query(
            " SELECT id, uid, latitude, longitude, data_hora_ultima_atualizacao " +
            " FROM localizacao_dispositivo " +
            " WHERE uid = $1 order by id desc limit 1",
            [req.params.uid]);

        if(resultado.rowCount > 0)
            res.status(200).send(resultado.rows[0]);
        else res.status(404).send({message: "Dispositivo não localizado!"});
    } catch (error) {
        serverError(res, error);
    } finally{
        client.end();
    }
};

exports.inserir = async (req, res) => {
    const { uid, lat, long } = req.params;

    if( !inRange( lat, -90, 90 ) ) {
        res.status(422).send({message: "Valor de Latitude deve estar entre -90 e 90!"});
        return;
    }

    if(!inRange( long, -180, 180 ) ) {
        res.status(422).send({message: "Valor de Longitude deve estar entre -180 e 180!"});
        return;
    }

    const client = await db.connect();        
    try {
        const result = await client.query(
            " INSERT INTO localizacao_dispositivo ( uid, latitude, longitude) " +
            " VALUES ( $1, $2, $3 )",
            [uid, lat, long]
        );

        res.status(201).send({message: "Localização inserida com Sucesso!"});
     } catch (error) {
        if(error.message.includes('fk_localizacao_dispositivo'))
            res.status(403).send({message: "Dispositivo não cadastrado!"});
        else serverError(res, error);
    } finally{
        client.end();
     }
};


