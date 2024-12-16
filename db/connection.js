// src/db/connection.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "wiser",
    waitForConnections: true,
    connectionLimit: 10, // Sesuaikan dengan kebutuhan
    queueLimit: 0,
    multipleStatements: true // Mengaktifkan multiple queries
});


module.exports = pool;
