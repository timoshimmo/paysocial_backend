const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paysocial'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;