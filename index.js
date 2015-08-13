"use strict";

// dependencies
let mount = require('koa-mount');
let koa = require('koa');
let auth = require('koa-basic-auth');
let app = module.exports = koa();
let config = require("./config")();
let userAuth = require('./lib/authentication.js');

// middleware configuration
app.use(userAuth.reqBasic);
app.use(mount('/admin', auth(config.adminUser)));

// apps
let adminApp = require('./admin/');
let siteApp = require('./site/');

// mount'em
app.use(mount('/admin', adminApp));
app.use(mount('/', siteApp));


// listen and all of that
app.listen(config.port);
console.log(`listening on port ${config.port}`);
