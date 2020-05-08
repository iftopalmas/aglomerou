require('dotenv/config')

let app = require('../app');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

app = express();

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cors()) 
app.use(express.static("public"));

const rotas = require('../rotas');
app.use('/', rotas);

app.listen(process.env.PORT, () => console.log(`Exemplo app ouvindo em http://localhost:${process.env.PORT}`))