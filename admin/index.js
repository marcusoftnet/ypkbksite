"use strict";
/**
 * Module dependencies.
 */

let logger = require('koa-logger');
let route = require('koa-route');
let koa = require('koa');
let app = module.exports = koa();

// middleware

app.use(logger());

// route middleware
let routes = require('./routes.js');
app.use(route.get('/', routes.list));
app.use(route.get('/chunk/new', routes.add));
app.use(route.get('/chunk/:id', routes.show));
app.use(route.post('/chunk', routes.create));
app.use(route.post('/chunk/:id', routes.update));
app.use(route.get('/chunk/:id/edit', routes.edit));
app.use(route.get('/chunk/:id/delete', routes.remove));

// don't start... this will be mounted