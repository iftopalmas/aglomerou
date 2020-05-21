const router = require('express').Router();
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
router.get('/:idDispositivo', localizacaoController.getUltimaLocalizacao);

/**
 * @swagger
 * /localizacao/{idDispositivo}/{lat}/{long}:
 *  post: 
 *    parameters:
 *      - name: idDispositivo
 *        in: path
 *        description: id do dispositivo
 *        required: true
 *        type: integer
 *      - name: lat
 *        in: path
 *        description: latitude da localização do dispositivo
 *        required: true
 *        type: integer
 *      - name: long
 *        in: path
 *        description: longitude da localização do dispositivo
 *        required: true
 *        type: integer
 *    description: Insere a localização de um dispositivo com um detemrinado id
 *    responses:
 *      '200': 
 *        description: Localização do dispositivo inserida com sucesso 
 */
router.post('/:idDispositivo/:lat/:long', localizacaoController.inserir);

module.exports = router;

