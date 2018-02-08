
const router = require('koa-router')();
const fs = require('fs');
const pool = require('../libs/mysql');
const Promise = require('bluebird');
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

router.get("/",(ctx)=>
{

    if(ctx.session.isNew)
    {
      ctx.redirect('/admin/login');
    }
    else
    {
      ctx.type= 'html';
      let html = fs.readFileSync('./admin/index.html','utf-8');
      ctx.body = html;
    }
});

router.get("/login",(ctx)=>
{
    if(!ctx.session.isNew)
    {
      ctx.redirect('/admin');
    }
    else
    {
      ctx.type= 'html';
      let html = fs.readFileSync('./admin/login.html','utf-8');
      ctx.body = html;
    }
});
//没有使用bluebird时候的primose处理回调
router.get('/test',(ctx)=>
{
    return new Promise((resolve,reject)=>
    {
      pool.query('SELECT * from s_user', function (error, results, fields)
      {
        if (error) throw error;
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~');
        resolve(results[0]);
      });
    }).then(function(val){
      console.log(val);
       ctx.type = 'json';
       ctx.body = val;
    });
});


//使用bluebird时候的primose处理回调
router.get('/bb',(ctx)=>
{
      pool.queryAsync('SELECT * from s_user').then(function (data)
      {
        console.log(data);
      });
});






//登录验证
router.post('/login',(ctx)=>
{
    console.log(ctx.request.body);
});


module.exports = router;
