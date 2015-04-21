"use strict";

// Dependencies
let koa = require('koa');
let route = require('koa-route');
let serve = require('koa-static');

let render = require('./lib/render.js');
let db = require('../lib/db.js');

let app = module.exports = koa();

// configuration
app.use(serve(__dirname + '/public'));

// routes
app.use(route.get('/', function *renderSite() {
	let vm = {};
	vm.hospitals = yield db.hospitalsCollection.find({});
	vm.clinics = yield db.clinicsCollection.find({});

	let textsArray = yield db.textsCollection.find({});
	vm.texts = createTextsObject(textsArray);

	vm.articles = yield db.articlesCollection.find({}); //TODO Filter on Date

	this.body = yield render('index', vm);
}));

function createTextsObject(textsArray) {
	let result = {};
	for (var i = 0; i < textsArray.length; i++) {
		result[textsArray[i].slug] = textsArray[i].text;
	};

	return result;
};