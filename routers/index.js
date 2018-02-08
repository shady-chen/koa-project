
const router = require('koa-router')();
const mysql = require('mysql');
const fs = require('fs');

router.get('/',function(ctx)
{
    let html = fs.readFileSync('./public/index.html','utf-8');
    ctx,type = 'html';
    ctx.body = html;
});


module.exports = router;
