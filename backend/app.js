const express = require('express');
const app = express();
app.use(express.static("public"));

const rotas = require('./rotas');
app.use('/', rotas);

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
    
