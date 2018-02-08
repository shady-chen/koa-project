
const mysql = require('mysql');//载入mysql
const config = require('../config/database');
//创建连接池
const pool = mysql.createPool(config);

module.exports = pool;
