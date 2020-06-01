const router = require('express').Router();
const controller = require('../controllers/dispositivo.controller');

/**
 * @swagger
 * /dispositivo/total:
 *  get: 
 *    description: Obtém o total de dispositivos cadastrados
 *    responses:
 *      '200': 
 *        description: Total de dispositivos obtido com sucesso 
 */
router.get('/total', controller.total);

/**
 * @swagger
 * /dispositivo/{uid}:
 *  get: 
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: Identificador único do dispositivo
 *        required: true
 *        type: string
 *    description: Obtém um dispositivo pelo uid
 *    responses:
 *      '200': 
 *        description: Dispositivo obtido com sucesso 
 */
router.get('/:uid', controller.get);

/**
 * @swagger
 * /dispositivo/{uid}/{tipo}:
 *  post: 
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: id único do dispositivo
 *        required: true
 *        type: string
 *      - name: tipo
 *        in: path
 *        description: Tipo do dispositivo
 *        required: true
 *        type: string
 *    description: Registra um dispositivo com um determinado UID (Unique Identifier)
 *    responses:
 *      '201': 
 *        description: Dispositivo registrado com sucesso
 *      '409': 
 *        description: Dispositivo com o UID informado já foi registrado
 *      '422': 
 *        description: Tipo de dispositivo desconhecido
 */
router.post('/:uid/:tipo', controller.inserir);

module.exports = router;
