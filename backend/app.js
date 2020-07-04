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

const porta = process.env.PORT || 8080;
const host = process.env.SERVER || "localhost"
const address = porta === 80 ? host : `${host}:${porta}`;

app.listen(porta, () => {
    console.log('Servidor iniciado. Abra o navegador em http://' + address);
});
