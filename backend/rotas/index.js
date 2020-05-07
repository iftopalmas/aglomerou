const rotas = require('express').Router();
const dispositivo = require('./dispositivo.js');
const localizacao = require('./localizacao.js');

rotas.use('/dispositivo', dispositivo);
rotas.use('/localizacao', localizacao);

rotas.get('/', (req, res) => res.sendFile('/index.html'));

module.exports = rotas;
