const router = require('express').Router();
const controller = require('../controllers/localizacao.controller');

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
 *    description: Obtém a última localização de um dispositivo com um determinado id
 *    responses:
 *      '200': 
 *        description: Localização do dispositivo obtido com sucesso 
 */
router.get('/:idDispositivo', controller.getUltimaLocalizacao);

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
 *        type: number
 *        minimum: -90
 *        maximum: 90
 *      - name: long
 *        in: path
 *        description: longitude da localização do dispositivo
 *        required: true
 *        type: number
 *        minimum: -180
 *        maximum: 180
 *    description: Insere a localização de um dispositivo com um determinado id
 *    responses:
 *      '201': 
 *        description: Localização do dispositivo inserida com sucesso 
 *      '403': 
 *        description: Dispositivo não cadastrado, não sendo autorizado a enviar localização.
 *      '422': 
 *        description: Latitude ou longitude inválida.
 */
router.post('/:idDispositivo/:lat/:long', controller.inserir);

module.exports = router;

