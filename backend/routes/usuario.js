const router = require('express').Router();
const controller = require('../controllers/usuario.controller');

/**
 * @swagger
 * /api/usuario:
 *  post: 
 *    summary: Cadastra um usuário para acesso à aplicação web
 *    parameters:
 *      - name: usuario
 *        in: body
 *        description: Usuário a ser inserido
 *        required: true
 *        schema:
 *            type: object
 *            required:
 *                - email
 *                - senha
 *            properties:
 *                email:
 *                    type: string
 *                senha:
 *                    type: string
 *    responses:
 *      '201': 
 *        description: Usuário cadastrado com sucesso
 *      '409': 
 *        description: Usuário com o email informado já foi cadastrado
 *      '422': 
 *        description: Email inválido
 */
router.post('/', controller.inserir);

/**
 * @swagger
 * /api/usuario:
 *  put: 
 *    summary: Atualiza um usuário da aplicação web
 *    parameters:
 *      - name: usuario
 *        in: body
 *        description: Usuário a ser atualizado
 *        required: true
 *        type: object
 *    responses:
 *      '204': 
 *        description: Usuário atualizado com sucesso
 *      '404': 
 *        description: Usuário com o id informado não foi encontrado
 *      '409': 
 *        description: Usuário com o email informado já foi cadastrado
 *      '422': 
 *        description: Email inválido
 */
router.put('/', controller.atualizar);

/**
 * @swagger
 * /api/usuario/{id}:
 *  delete: 
 *    summary: Exclui um usuário da aplicação web
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id do Usuário a ser excluído
 *        required: true
 *        type: integer
 *    responses:
 *      '200': 
 *        description: Usuário excluído com sucesso
 *      '404': 
 *        description: Usuário com o id informado não foi encontrado
 */
router.delete('/:id', controller.deletar);

module.exports = router;