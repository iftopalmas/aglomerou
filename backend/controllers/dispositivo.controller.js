const db = require("../config/db");
const { serverError } = require("../util");
const axios = require('axios');

exports.total = async (req, res) => {
    const client = await db.connect();
    try {
        const resultado = await client.query('SELECT coalesce(count(uid), 0) as total FROM dispositivo');
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
        const sql = 'SELECT uid, tipo, bloqueado, data_hora_cadastro FROM dispositivo WHERE uid = $1';
        const resultado = await client.query(sql, [req.params.uid]);

        if(resultado.rowCount > 0) {
            console.log({message:`Dispositivo retornado no uid: ${req.params.uid}`, bloqueado: resultado.rows[0].bloqueado});
            if(resultado.rows[0].bloqueado)
                res.status(404).send({message: 'Dispositivo bloqueado!'});
            else { res.status(200).send(resultado.rows[0]); }
        } else { res.status(404).send({message: 'Dispositivo não localizado!'}); }
    } catch (error) {
        serverError(res, error);
    } finally{
        client.end();
    }
};

exports.inserir = async (req, res) => {
    const { uid, tipo } = req.params;

    if(!req.body.captcha) {
       return res.status(401).json({success: 'false', message: 'Por favor selecione o captcha!'});
    }

    const secretKey = process.env.CAPTCHA_SECRET_KEY;
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;    

    const response = await axios.post(verifyURL);

    if(!response.data.success) {
        const msg = {success: false, message: 'Falha na verificação do captcha!'};
        console.log(msg);

        return res.status(401).json(msg);
    }

    console.log({success: true, message: `Dispositivo ${uid} autenticado!`});

    const client = await db.connect();
    try {

        await client.query(
            'INSERT INTO dispositivo ( uid, tipo ) VALUES ( $1, $2 )',
            [uid, tipo]
        );

        const msg = {message: 'Dispositivo registrado com Sucesso!'};
        console.log(msg);
        res.status(201).send(msg);
     } catch (error) {
        if(error.message.includes('dispositivo_uid_key'))
            res.status(409).send({message: 'Dispositivo com o UID informado já foi registrado!'});
        else serverError(res, error);
    } finally{
        client.end();
     }
};


