const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodemax',
    password: 'qwe123456'
});

module.exports = pool.promise();