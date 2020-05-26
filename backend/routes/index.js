const rotas = require('express').Router();
const dispositivo = require('./dispositivo');
const localizacao = require('./localizacao');


rotas.get('/', (req, res) => res.sendFile('/index.html'));

rotas.use('/dispositivo', dispositivo);
rotas.use('/localizacao', localizacao);

module.exports = rotas;
