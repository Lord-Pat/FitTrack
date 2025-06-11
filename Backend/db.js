// Creación archivo de conexión
const mysql = require('mysql2/promise');
require('dotenv').config();

// contenidos directamente obtenidos de env donde esta la información de la bbdd
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);

module.exports = pool;
