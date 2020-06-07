const router = require('express').Router();
const controller = require('../controllers/usuario.controller');

/**
 * @swagger
 * /usuario:
 *  post: 
 *    parameters:
 *      - name: usuario
 *        in: body
 *        description: Usuário a ser inserido
 *        required: true
 *        type: object
 *    description: Cadastra um usuário para acesso à aplicação web
 *    responses:
 *      '201': 
 *        description: Usuário cadastrado com sucesso
 *      '409': 
 *        description: Usuário com o email informado já foi cadastrado
 */
router.post('/', controller.inserir);

/**
 * @swagger
 * /usuario:
 *  put: 
 *    parameters:
 *      - name: usuario
 *        in: body
 *        description: Usuário a ser atualizado
 *        required: true
 *        type: object
 *    description: Atualiza um usuário da aplicação web
 *    responses:
 *      '204': 
 *        description: Usuário atualizado com sucesso
 *      '404': 
 *        description: Usuário com o id informado não foi encontrado
 *      '409': 
 *        description: Usuário com o email informado já foi cadastrado
 */
router.put('/', controller.atualizar);

/**
 * @swagger
 * /usuario:
 *  delete: 
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id do Usuário a ser excluído
 *        required: true
 *        type: integer
 *    description: Exclui um usuário da aplicação web
 *    responses:
 *      '200': 
 *        description: Usuário excluído com sucesso
 *      '404': 
 *        description: Usuário com o id informado não foi encontrado
 */
router.delete('/:id', controller.deletar);

module.exports = router;