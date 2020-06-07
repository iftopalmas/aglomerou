require('dotenv/config')
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.static("public"));

app.use(express.urlencoded());
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

const rotas = require('./routes');
app.use('/', rotas);

require('./config/swagger')(app);

const http = require('http').Server(app);

const serverSocket = require('socket.io')(http);

const porta = process.env.PORT || 8080;
const host = process.env.HEROKU_APP_NAME ?
                `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` :
                "http://localhost";

http.listen(porta, () => {
    const portaStr = porta === 80 ? '' : ':' + porta;
    if (process.env.HEROKU_APP_NAME)
        console.log('Servidor iniciado. Abra o navegador em ' + host);
    else console.log('Servidor iniciado. Abra o navegador em ' + host + portaStr);
});