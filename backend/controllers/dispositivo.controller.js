const db = require("../config/db");
const { serverError } = require("../util");

exports.total = async (req, res) => {
    try {
        const resultado = await db.query("SELECT coalesce(count(uid), 0) as total FROM dispositivo");
        res.status(200).send(resultado.rows[0]);
    } catch (error) {
        serverError(res, error);
    }
};

exports.get = async (req, res) => {
    try {
        const resultado = await db.query(
            " SELECT uid, tipo, data_hora_cadastro " +
            " FROM dispositivo WHERE uid = $1 ",
            [req.params.uid]);

        if(resultado.rows.length > 0)
            res.status(200).send(resultado.rows[0]);
        else res.status(404).send({message: "Dispositivo não localizado!"});
    } catch (error) {
        serverError(res, error);
    }
};

exports.inserir = async (req, res) => {
    const { uid, tipo } = req.params;

    try {
        const result = await db.query(
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
     }
};


