
const Koa = require('koa');
const app = new Koa();
const KoaStatic = require('koa-static');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const onError = require('koa-onerror');
const router = require('koa-router')();
onError(app);//监听~~错误

//使用session
app.keys = ['shady\'s session'];
const CONFIG =
{
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

//使用bodyparser 解析post get的参数
app.use(bodyParser());


//前端页面
const indexRouter = require('./routers/index');//加载index路由
//router.use('/index',indexRouter.routes(),indexRouter.allowedMethods());//如果加了这个 就会使路由嵌套 访问localhost:1118就没有东西 访问localhost:1118/index才有东西
app.use(indexRouter.routes(),indexRouter.allowedMethods());//使用index路由
app.use(KoaStatic(__dirname + '/public'));//加载前端静态文件



//后台页面
const adminRouter = require('./routers/admin');
router.use("/admin",adminRouter.routes(),adminRouter.allowedMethods());
app.use(adminRouter.routes(),adminRouter.allowedMethods());
app.use(KoaStatic(__dirname + '/admin'));//加载后台静态文件





app.listen(1118);//监听1118端口



console.log("Appliction is running at localhost port:1118");
