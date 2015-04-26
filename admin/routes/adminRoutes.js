"use strict";
let render = require('../lib/render.js');
let db = require('../../lib/db.js');

module.exports.showAdminHome = function *() {
	let hospitals = yield db.hospitalsCollection.find({});
	let clinics = yield db.clinicsCollection.find({});

	let texts = yield db.textsCollection.find({}, { sort : { slug : 1}});
	let articles = yield db.articlesCollection.find({}, { sort : { publishStart : -1}});

	let vm = {
		hospitals : hospitals,
		clinics : clinics,
		texts : texts,
		articles : articles
	};

	this.body = yield render('index', vm);
};