const rotas = require('express').Router();
const dispositivo = require('./dispositivo');
const localizacao = require('./localizacao');
const usuario = require('./usuario');


rotas.get('/', (req, res) => res.sendFile('/index.html'));

rotas.use('/dispositivo', dispositivo);
rotas.use('/localizacao', localizacao);
rotas.use('/usuario', usuario);

module.exports = rotas;
