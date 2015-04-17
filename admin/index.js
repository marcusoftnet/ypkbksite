"use strict";
/**
 * Module dependencies.
 */

let logger = require('koa-logger');
let route = require('koa-route');
let koa = require('koa');
let app = module.exports = koa();

// middleware
//app.use(logger());

// routes
let adminRoutes = require('./routes/adminRoutes.js');
app.use(route.get('/', adminRoutes.showAdminHome));

let hospitalRoutes = require('./routes/hospitalRoutes.js');
app.use(route.get('/hospital/', hospitalRoutes.showNewHospitalPage));
app.use(route.post('/hospital/', hospitalRoutes.storeNewHospital));
app.use(route.get('/hospital/:id', hospitalRoutes.showHospitalPage));
app.use(route.post('/hospital/:id', hospitalRoutes.updateHospital));

// GET  /clinic/new -> return create new clinic form
// POST /clinic/    -> add new clinic information
// GET  /clinic/:id -> show the clinic information for :id in form
// POST /clinic/:id -> update the clinic information

// GET  /news/new -> return create new news form
// POST /news/    -> add new news information
// GET  /news/:id -> show the news information for :id in form
// POST /news/:id -> update the news information

let textRoutes = require('./routes/textRoutes.js');
app.use(route.get('/text/', textRoutes.showNewTextPage));
app.use(route.post('/text/', textRoutes.storeNewText));
app.use(route.get('/text/:id', textRoutes.showTextPage));
app.use(route.post('/text/:id', textRoutes.updateText));
