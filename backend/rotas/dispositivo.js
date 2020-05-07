const dispositivo = require('express').Router();

const getDispositivo = (req, res) => {
    //TODO: buscar dados do BD
    res.status(200).json({ id: req.params.id, ativo: true });
};

dispositivo.get('/:id', getDispositivo);

module.exports = dispositivo;

