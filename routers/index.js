
const router = require('koa-router')();
const mysql = require('mysql');
const fs = require('fs');
const db_pool = mysql.createPool(
{
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'shop'
});

router.get('/',function(ctx)
{
    let html = fs.readFileSync('./public/index.html','utf-8');
    ctx,type = 'html';
    ctx.body = html;
});


router.get('/index',function(ctx)
{
  return new Promise((resolve,reject)=>
  {
    db_pool.query('SELECT * from s_user', function (error, results, fields)
    {
      if (error) throw error;
      for(let val of results)
      {
        console.log(val)
      }
      ctx.type = 'html';
      ctx.body = results.toString();
      resolve();
    });
  }).then(function(){

  });

});












module.exports = router;
