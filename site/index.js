"use strict";

// Dependencies
let koa = require('koa');
let route = require('koa-route');
let serve = require('koa-static');

let render = require('./lib/render.js');
let db = require('./lib/db.js');

let app = module.exports = koa();

// configuration
app.use(serve(__dirname + '/public'));

// routes
app.use(route.get('/', function *renderSite() {
	let vm = {};
	vm.hospitals = yield db.hospitalCollection.find({});

	this.body = yield render('index', vm);
}));