"use strict";

// Dependencies
let koa = require('koa');
let route = require('koa-route');
let serve = require('koa-static');

let app = module.exports = koa();

// configuration
app.use(serve(__dirname + '/public'));

// routes
let siteRoutes = require("./siteRoutes.js");
app.use(route.get('/', siteRoutes.renderSite));
app.use(route.post('/sendemail', siteRoutes.sendEmail));