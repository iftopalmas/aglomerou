const localizacao = require('express').Router();

const getUltimaLocalizacao = (req, res) => {
    //TODO: buscar dados do BD
    res.status(200).json({ idDispositivo: req.params.idDispositivo, latitude: 1, longitude: 2 });
};

/**
 * @swagger
 * /localizacao/{idDispositivo}:
 *  get: 
 *    parameters:
 *      - name: idDispositivo
 *        in: path
 *        description: id do dispositivo
 *        required: true
 *        type: integer
 *    description: Obtém a última localização de um dispositivo com um detemrinado id
 *    responses:
 *      '200': 
 *        description: Localização do dispositivo obtido com sucesso 
 */
localizacao.get('/:idDispositivo', getUltimaLocalizacao);

module.exports = localizacao;

