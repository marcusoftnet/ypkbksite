"use strict";

// Dependencies
let route = require('koa-route');
let koa = require('koa');
let serve = require('koa-static');
let app = module.exports = koa();

// configuration
app.use(serve('./public'));