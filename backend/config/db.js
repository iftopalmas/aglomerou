const pool = require('pg');

module.exports.connect = () => {
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

  client.connect();
  return client;
};
