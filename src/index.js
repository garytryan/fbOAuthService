"use strict";
exports.__esModule = true;
var Koa = require('koa');
var Router = require('koa-router');
var mount = require('koa-mount');
var bodyParser = require('koa-bodyparser');
var session = require('koa-session');
var accesslog = require('koa-accesslog');
var grantConfig = require('./config/grant.config');
var routes = require('./routes');
var cors = require('koa-cors');
var validate = require('koa-validate');
var index_1 = require("./utils/errorHandler/index");
var app = new Koa();
var router = new Router();
var Grant = require('grant-koa');
var grant = new Grant(grantConfig);
validate(app);
routes.configRoutes(router);
app.keys = ['grant'];
app
    .use(index_1["default"](app))
    .use(cors())
    .use(session(app))
    .use(bodyParser())
    .use(accesslog())
    .use(mount(grant))
    .use(router.routes())
    .use(router.allowedMethods());
app.on('error', function (error, ctx) { return console.log(error.message, error.errors); });
app.listen(3001, function () { return console.log('listening on port 3001'); });
