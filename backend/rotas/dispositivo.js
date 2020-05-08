const dispositivo = require('express').Router();
const pool = require('../db/config')


const getAll = async (req, res) => {
    
    try {
        await pool.connect()
        let {rows} = await pool.query('SELECT * FROM teste')
        res.status(200).json(rows);

    } catch (err) {
        console.log(err.stack);
    } finally {
        await pool.end();
    }
}

const getDispositivo = async(req, res) => {
    //TODO: buscar dados do BD
    //res.status(200).json({ id: req.params.id, ativo: true });
    try{
        let { id } = req.params
        let { rows } = await pool.query('SELECT * FROM dispositivos WHERE id = $1', [id])
        res.send(rows[0])
    } catch (err) {
        console.log(err.stack);
    }
};

dispositivo.get('/', getAll);
dispositivo.get('/:id', getDispositivo);

module.exports = dispositivo;
