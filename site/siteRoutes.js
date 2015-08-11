"use strict";
let parse = require('co-body');
let sendGridConnector = require('sendgrid');

let config = require('../config')();
let render = require('./lib/render.js');
let db = require('../lib/db.js');

module.exports.home = function *home() {

	let dbTasks = {
		hospitalsFromDb : db.hospitalsCollection.find({}),
		textsFromDb 	: db.textsCollection.find({}),
		clinicsFromDb 	: yield db.clinicsCollection.find({}),
		articlesFromDb 	: yield db.articlesCollection.find({
					publishStart : { "$lte": getToday() },
					publishEnd   : { "$gte": getToday() }
				})
	};

	let result = yield dbTasks;

	let vm = {
		hospitals : createHospitalsViewModel(result.hospitalsFromDb),
		clinics   : createClinicsViewModel(result.clinicsFromDb),
		texts 	  : createTextsObject(result.textsFromDb),
		articles  : prepareArticles(result.articlesFromDb)
	};

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

module.exports.getDetails = function *(section, slugToFind) {
	let vm = {};

	if(section === "article") 
		vm = yield db.articlesCollection.findOne({ slug: slugToFind });

	this.body = yield render('article_page', vm);
};


function getToday(){
	let today = new Date();
	today.setHours(23,59,59,0);
	return today;
};

function createHospitalsViewModel(hospitals) {
	for (var i = hospitals.length - 1; i >= 0; i--) {
		if(hospitals[i].rsPhotoFileName.substring(0,4)!="http") {
			hospitals[i].rsPhotoFileName =  
				"img/hospitals/" + hospitals[i].rsPhotoFileName;
		}
	};

	return hospitals;
};

function createClinicsViewModel(clinics) {
	for (var i = clinics.length - 1; i >= 0; i--) {
		if(clinics[i].clinicPhotoFileName.substring(0,4)!="http") {
			clinics[i].clinicPhotoFileName =  
				"img/clinics/" + clinics[i].clinicPhotoFileName;
		}
	};

	return clinics;
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