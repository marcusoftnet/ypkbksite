"use strict";
/**
 * Module dependencies.
 */

let logger = require('koa-logger');
let route = require('koa-route');
let render = require('./lib/render.js');
let koa = require('koa');
let app = module.exports = koa();

// middleware
//app.use(logger());

// route middleware

// HTTP
// GET - return some data/page
// POST - send data to the server

// routes
app.use(route.get('/', showAdminHome));

function *showAdminHome() {
	let hospitals = []; // TODO: Get hospital from db
	let vm = { hospitals : hospitals };

	this.body = yield render('index', vm);
};

app.use(route.get('/hospital/new', showNewHospitalPage));

function *showNewHospitalPage() {
	this.body = yield render('hospital_new');
};
// POST /hospital/    -> add new hospital information
// GET  /hospital/:id -> show the hospital information for :id in form
// POST /hospital/:id -> update the hospital information

// GET  /clinic/new -> return create new clinic form
// POST /clinic/    -> add new clinic information
// GET  /clinic/:id -> show the clinic information for :id in form
// POST /clinic/:id -> update the clinic information

// GET  /news/new -> return create new news form
// POST /news/    -> add new news information
// GET  /news/:id -> show the news information for :id in form
// POST /news/:id -> update the news information

// GET  /text/new -> return create new text form
// POST /text/    -> add new text information
// GET  /text/:id -> show the text information for :id in form
// POST /text/:id -> update the text information



// don't start... this will be mounted