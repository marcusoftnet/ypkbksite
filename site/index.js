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
let siteRoutes = require("./siteRoutes.js");
app.use(route.get('/', function *renderSite() {
	let vm = {};
	vm.hospitals = yield db.hospitalsCollection.find({});
	vm.clinics = yield db.clinicsCollection.find({});

	let textsArray = yield db.textsCollection.find({});
	vm.texts = createTextsObject(textsArray);

	let today = new Date();
	today.setHours(23,59,59,0);

	let articleArray = yield db.articlesCollection.find(
		{
			publishStart : { "$lte": today },
			publishEnd   : { "$gte": today }
		}
	);
	vm.articles = prepareArticles(articleArray);

	this.body = yield render('index', vm);
}));
app.use(route.post('/sendemail', siteRoutes.sendEmail))

function prepareArticles (articles) {
	for (var i = 0; i < articles.length; i++) {
		if(!exists(articles[i].imgURL)){
			articles[i].imgURL = "/img/articles/defaultNews.png";
		}

		if(!exists(articles[i].intro) && exists(articles[i].content)){
			let newIntro = articles[i].content.substring(0,100) + "...";
			console.log("INTRO: " + newIntro);
			articles[i].intro = newIntro;
		}
	};
	// console.log(articles);
	return articles;
};

function createTextsObject(textsArray) {
	let result = {};
	for (var i = 0; i < textsArray.length; i++) {
		result[textsArray[i].slug] = textsArray[i].text;
	};

	return result;
};

var exists = function (value) {
	if(value === undefined)
		return false;
	if(value === null)
		return false;
	if(value === "")
		return false;
	return true;
};