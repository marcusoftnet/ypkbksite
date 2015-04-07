"use strict";

// dependencies
let mount = require('koa-mount');
let koa = require('koa');
let app = module.exports = koa();
let config = require("./config")();

// apps
let adminApp = require('./admin/');
let siteApp = require('./site/');

// mount'em
app.use(mount('/', siteApp));
app.use(mount('/admin', adminApp));

// listen and all of that
app.listen(config.port);
console.log(`listening on port ${config.port}`);
