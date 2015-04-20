"use strict";
/**
 * Module dependencies.
 */

let logger = require('koa-logger');
let route = require('koa-route');
let koa = require('koa');
let app = module.exports = koa();

// middleware
// app.use(logger());

// routes
let adminRoutes = require('./routes/adminRoutes.js');
app.use(route.get('/', adminRoutes.showAdminHome));

let hospitalRoutes = require('./routes/hospitalRoutes.js');
app.use(route.get('/hospital/', hospitalRoutes.showNewHospitalPage));
app.use(route.post('/hospital/', hospitalRoutes.storeNewHospital));
app.use(route.get('/hospital/:id', hospitalRoutes.showHospitalPage));
app.use(route.post('/hospital/:id', hospitalRoutes.updateHospital));

let clinicRoutes = require('./routes/clinicRoutes.js');
app.use(route.get('/clinic/', clinicRoutes.showNewClinicPage));
app.use(route.post('/clinic/', clinicRoutes.storeNewClinic));
app.use(route.get('/clinic/:id', clinicRoutes.showClinicPage));
app.use(route.post('/clinic/:id', clinicRoutes.updateClinic));

let articleRoutes = require('./routes/articleRoutes.js');
app.use(route.get('/article/', articleRoutes.showNewArticlePage));
app.use(route.post('/article/', articleRoutes.storeNewArticle));
app.use(route.get('/article/:id', articleRoutes.showArticlePage));
app.use(route.post('/article/:id', articleRoutes.updateArticle));

let textRoutes = require('./routes/textRoutes.js');
app.use(route.get('/text/', textRoutes.showNewTextPage));
app.use(route.post('/text/', textRoutes.storeNewText));
app.use(route.get('/text/:id', textRoutes.showTextPage));
app.use(route.post('/text/:id', textRoutes.updateText));
