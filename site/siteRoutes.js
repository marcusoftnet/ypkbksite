"use strict";
let parse = require('co-body');
let sendGridConnector = require('sendgrid');

let config = require('../config')();
let render = require('./lib/render.js');
let db = require('../lib/db.js');

module.exports.renderSite = function *renderSite() {
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
};

module.exports.sendEmail = function *() {
	let parsedEmailForm = yield parse(this);

	let sendGridParameters = {
	    	to: parsedEmailForm.to,
	    	from: parsedEmailForm.email,
	    	subject: 'From: ' + parsedEmailForm.name + ' (' + parsedEmailForm.phone + ')',
	    	text: parsedEmailForm.message
		};

	let status = 200;
	let bodyText = sendGridParameters;

	if(config.mode === 'prod'){
		let sendgrid = sendGridConnector(config.sendGridUser.name, config.sendGridUser.pass);

		sendgrid.send(
			sendGridParameters,
			function(err, json) {
		    	if (err) {
		    		bodyText = err.message;
		    		status = 400;
		    	}
			}
		);
	}

	this.body = bodyText;
	this.status = status;
};

function prepareArticles (articles) {
	for (var i = 0; i < articles.length; i++) {
		updateImgUrl(articles[i]);
		updateIntroText(articles[i]);
	};
	return articles;
};

function updateIntroText(article){
	if(!exists(article.intro) && exists(article.content)){
		let newIntro = article.content.substring(0,100) + "...";
		article.intro = newIntro;
	}
};

function updateImgUrl(article){
	if(!exists(article.imgURL)){
		article.imgURL = "/img/articles/defaultNews.png";
	};
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