
const pool = require('pg');

console.log(`Conectando ao banco de dados em ${process.env.POSTGRES_HOST}`);
module.exports.connect = () => {
    const client = new pool.Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
        max: 20,
        idleTimeoutMillis: 15000,
        connectionTimeoutMillis: 5000,
    });

    client.connect();
    return client;
};
