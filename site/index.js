"use strict";

// Dependencies
let koa = require('koa');
let route = require('koa-route');
let serve = require('koa-static');
let path = require('path');
let staticCache = require('koa-static-cache');

let app = module.exports = koa();

// configuration
app.use(serve(__dirname + '/public'));

app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 30 * 24 * 60 * 60
}));

// routes
let siteRoutes = require("./siteRoutes.js");
app.use(route.get('/:section/:slug', siteRoutes.getDetails));
app.use(route.post('/sendemail', siteRoutes.sendEmail));
app.use(route.get('/', siteRoutes.home));
