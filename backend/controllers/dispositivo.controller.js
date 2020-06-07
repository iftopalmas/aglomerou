const db = require("../config/db");
const { serverError } = require("../util");

exports.total = async (req, res) => {
    const client = await db.connect();
    try {
        const resultado = await client.query("SELECT coalesce(count(uid), 0) as total FROM dispositivo");
        res.status(200).send(resultado.rows[0]);
    } catch (error) {
        serverError(res, error);
    } finally{
        client.end();
    }
};

exports.get = async (req, res) => {
    const client = await db.connect();
    try {
        const resultado = await client.query(
            " SELECT uid, tipo, data_hora_cadastro " +
            " FROM dispositivo WHERE uid = $1 ",
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
    const { uid, tipo } = req.params;

    const client = await db.connect();
    try {
        const result = await client.query(
            " INSERT INTO dispositivo ( uid, tipo ) VALUES ( $1, $2 )",
            [uid, tipo]
        );

        const msg = {message: "Dispositivo registrado com Sucesso!"};
        console.log(msg);
        res.status(201).send(msg);
     } catch (error) {
        if(error.message.includes('dispositivo_uid_key'))
            res.status(409).send({message: "Dispositivo com o UID informado já foi registrado!"});
        else serverError(res, error);
    } finally{
        client.end();
     }
};


