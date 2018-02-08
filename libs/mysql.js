
const mysql = require('mysql');//载入mysql
const config = require('../config/database');
//创建连接池
const pool = mysql.createPool(config);

/*
 *下面是监听数据库的行为
 * acquire 是获取数据连接
 * enqueue 是排队中，等待可用的数据库连槽
 * release 是释放    即数据库操作完毕要释放掉
 */

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});
pool.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
});
pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});
pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});
module.exports = pool;
