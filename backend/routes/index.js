const rotas = require('express').Router();
const dispositivo = require('./dispositivo');
const localizacao = require('./localizacao');
const notificacao = require('./notificacao');
const usuario = require('./usuario');
  
rotas.use('/dispositivo', dispositivo);
rotas.use('/notificacao', notificacao);
rotas.use('/localizacao', localizacao);
rotas.use('/usuario', usuario);

module.exports = rotas;
