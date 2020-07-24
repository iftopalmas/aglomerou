const router = require('express').Router();
const controller = require('../controllers/localizacao.controller');

/**
 * @swagger
 * paths:
 *  /notificacao:
 *    post:
 *      summary: Registrar aglomeração notificada por usuário em um determinado local.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: notificacao
 *          description: Objeto com os dados da notificação a ser criada
 *          schema:
 *              type: object
 *              required:
 *                  - id_dispositivo
 *                  - latitude
 *                  - longitude
 *                  - estimativa_total_pessoas
 *              properties:
 *                  id_dispositivo:
 *                      type: number
 *                  latitude:
 *                      type: number
 *                  longitude:
 *                      type: number
 *                  estimativa_total_pessoas:
 *                      type: number
 *    responses:
 *      '201':
 *        description: Notificação criada!
 *      '422':
 *        description: Todos os valores devem ser preenchidos
 */
router.post('/notificacao', controller.inserir);
