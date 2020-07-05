require('dotenv/config')
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const rotas = require('./routes');
app.use('/', rotas);

require('./config/swagger')(app);

const http = require('http').Server(app);

const serverSocket = require('socket.io')(http);

//Porta usada internamente para evitar rodar o node como root
const internalPort = 8080;

//Porta usada externamente, quando o app é executado no Docker
const externalPort = process.env.PORT || internalPort;
const host = process.env.SERVER || "localhost"
const address = externalPort == 80 ? host : `${host}:${externalPort}`;

app.listen(internalPort, () => {
    console.log('Servidor iniciado. Abra o navegador em http://' + address);
});
