const db = require("../config/db");
const { serverError } = require("../util");

exports.getNotificacoesRecentes = async (req, res) => {
    const client = await db.connect();
    try {
        /*
        TODO: A view corta 2 casas decimais como uma forma simplória de agrupar notificações por local. 
        É preciso buscar uma solução com maior precisão.
        */
        const sql = 'select * from vwNotificacoesRecentes';
        const { rows } = await client.query(sql);
        console.log(`Total de locais com notificações atuais: ${rows.length}`);
        res.status(200).send(rows);
    } catch (error) {
        serverError(res, error);
    } finally {
        client.end();
    }
};

exports.inserir = async (req, res) => {
    const { uid, latitude, longitude, estimativa_total_pessoas, observacoes } = req.body;
    const client = await db.connect();
    try {
        const sql = 'SELECT bloqueado FROM dispositivo WHERE uid = $1 ';
        const resultado = await client.query(sql, [uid]);

        if (resultado.rowCount === 0) {
            return res.status(404).send({ message: 'Dispositivo não localizado!' });
        }

        if (resultado.rows[0].bloqueado) {
            res.status(401).send({ message: 'Dispositivo bloqueado!' });
        } else {
            const sql = 'INSERT INTO notificacao ( uid, latitude, longitude, estimativa_total_pessoas, observacoes ) VALUES ( $1, $2, $3, $4, $5 )';
            await client.query(sql, [uid, latitude, longitude, estimativa_total_pessoas, observacoes]);

            const msg = {message: 'Notificação registrada com Sucesso!'};
            console.log(msg);
            res.status(201).send(msg);
        }
     } catch (error) {
        res.status(422).send({message: 'Todos os valores devem ser enviados'});
    } finally{
        client.end();
     }
};
