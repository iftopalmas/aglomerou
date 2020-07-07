require('dotenv/config');
const cors = require('cors');
const express = require('express');

const app = express();

const http = require('http').Server(app);

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require('./config/swagger')(app);

const serverSocket = require('socket.io')(http);
const rotas = require('./routes');

app.use('/', rotas);

// Porta usada internamente para evitar rodar o node como root
const internalPort = 8080;

// Porta usada externamente, quando o app é executado no Docker
const externalPort = process.env.PORT || internalPort;
const host = process.env.SERVER || 'localhost';
const address = externalPort === 80 ? host : `${host}:${externalPort}`;

app.listen(internalPort, () => {
  console.log(`Servidor iniciado. Abra o navegador em http://${address}`);
});
