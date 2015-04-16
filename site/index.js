"use strict";

// Dependencies
let koa = require('koa');
let route = require('koa-route');
let serve = require('koa-static');

let render = require('./lib/render.js');

let app = module.exports = koa();

// configuration
app.use(serve('./public'));

// routes
app.use(route.get('/', function *renderSite() {
	// get content data from database
	let vm = {};

	//  render site with data
	this.body = yield render('index', vm);
}));