const localizacao = require('express').Router();

const getUltimaLocalizacao = (req, res) => {
    //TODO: buscar dados do BD
    res.status(200).json({ idDispositivo: req.params.idDispositivo, latitude: 1, longitude: 2 });
};

localizacao.get('/:idDispositivo', getUltimaLocalizacao);

module.exports = localizacao;

