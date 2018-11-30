const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const {connect,initSchemas} = require('./database/init');
const Router = require('koa-router');
let user = require('./appApi/user.js') ;
let goods= require('./appApi/goods');

let router = new Router();
router.use('/user',user.routes());
router.use('/goods',goods.routes());
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const cors = require('koa2-cors');
app.use(cors())

;(async()=>{
    await connect();
    initSchemas();
})();
app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000');
})
