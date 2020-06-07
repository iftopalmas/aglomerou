const router = require('express').Router();
const controller = require('../controllers/usuario.controller');

router.post('/', controller.inserir);

router.put('/', controller.atualizar);

router.delete('/:id', controller.deletar);

module.exports = router;