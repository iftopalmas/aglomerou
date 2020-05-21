const localizacao = require('express').Router();
const localizacaoController = require('../controllers/localizacao.controller');

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
localizacao.get('/:idDispositivo', localizacaoController.getUltimaLocalizacao);

localizacao.post('/:idDispositivo/:lat/:long', localizacaoController.inserir);

module.exports = localizacao;

