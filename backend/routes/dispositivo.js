const router = require('express').Router();
const controller = require('../controllers/dispositivo.controller');

/**
 * @swagger
 * /api/dispositivo/total:
 *  get: 
 *    summary: Obtém o total de dispositivos cadastrados
 *    responses:
 *      '200': 
 *        description: Total de dispositivos obtido com sucesso 
 */
router.get('/total', controller.total);

/**
 * @swagger
 * /api/dispositivo/{uid}:
 *  get: 
 *    summary: Obtém um dispositivo pelo uid
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: Identificador único do dispositivo
 *        required: true
 *        type: string
 *    responses:
 *      '200': 
 *        description: Dispositivo obtido com sucesso 
 */
router.get('/:uid', controller.get);

/**
 * @swagger
 * /api/dispositivo/{uid}/{tipo}:
 *  post: 
 *    summary: Registra um dispositivo com um determinado UID (Unique Identifier)
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
 *      - name: captcha
 *        in: body
 *        description: Código de validação do CAPTCHA
 *        required: true
 *        type: string
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
