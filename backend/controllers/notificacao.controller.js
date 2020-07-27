const db = require("../config/db");

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
            const sql = 'INSERT INTO notificacao ( latitude, longitude, estimativa_total_pessoas, observacoes ) VALUES ( $1, $2, $3, $4 )';
            await client.query(sql, [latitude, longitude, estimativa_total_pessoas, observacoes]);

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
