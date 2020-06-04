
const pool = require('pg');

const client = new pool.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 20,
    idleTimeoutMillis: 15000,
    connectionTimeoutMillis: 5000,
});

client.connect( err => {
    if (err) {
      return console.error('Não foi possível conectar ao banco de dados', err.stack);
    }
    console.log('Base de dados conectado com sucesso!');
});

client.end( () => { console.log('O cliente desconectou!'); });


module.exports = {
    query: (text, params) => client.query(text, params)
};
