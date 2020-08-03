const router = require("express").Router();
const controller = require("../controllers/notificacao.controller");

/**
 * @swagger
 * paths:
 *  /api/notificacao:
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
 *                  - uid
 *                  - latitude
 *                  - longitude
 *                  - estimativa_total_pessoas
 *              properties:
 *                  uid:
 *                      type: string
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
router.post('/', controller.inserir);

module.exports = router;