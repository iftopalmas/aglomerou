const rotas = require('express').Router();
const dispositivo = require('./dispositivo');
const localizacao = require('./localizacao');
const usuario = require('./usuario');

//rotas.get('/', (req, res) => res.sendFile('/index.html'));

rotas.get('/', (req, res) => {
    console.log('redirect');
    
    res.writeHead(302, {'Location': 'https://ifto-palmas.github.io/aglomerou/'});
    res.end();
});
  

rotas.use('/dispositivo', dispositivo);
rotas.use('/localizacao', localizacao);
rotas.use('/usuario', usuario);

module.exports = rotas;
