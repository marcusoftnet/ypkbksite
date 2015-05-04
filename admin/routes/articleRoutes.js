"use strict";
let parse = require('co-body');
let fs = require('co-fs');

let render = require('../lib/render.js');
let db = require('../../lib/db.js');

let helpers = require("./routeHelpers.js");

module.exports.showNewArticlePage = function *() {
	let today = new Date();
	let sixMonthsAway = new Date();
	sixMonthsAway.setDate(today.getDate()+180);
	today.setHours(0,0,0,0);
	sixMonthsAway.setHours(0,0,0,0);

	let dates = {
		publishStartString  : formatDate(today),
		publishEndString 	: formatDate(sixMonthsAway)
	};

	let pictures = yield getStandardPictures();

	this.body = yield render('article', { article : dates, standardPictures: pictures});
};

module.exports.storeNewArticle = function *() {
	let parsedArticleData = yield parse(this);
	let articleToStore = createArticleFromPostedData(parsedArticleData);

	let inserted = yield db.articlesCollection.insert(articleToStore);
	let id = inserted._id;

	this.redirect(`/admin/article/${id}`);
};

module.exports.showArticlePage = function *(id) {
	let a = yield db.articlesCollection.findById(id);

	a.publishStartString = formatDate(a.publishStart);
	a.publishEndString = formatDate(a.publishEnd);

	let pictures = yield getStandardPictures();

	this.body = yield render('article', { article : a, standardPictures: pictures});
};

module.exports.updateArticle = function *(id) {
	let parsedArticleData = yield parse(this);
	let articleToStore = createArticleFromPostedData(parsedArticleData);

	yield db.articlesCollection.updateById(id, articleToStore);

	this.redirect(`/admin/article/${id}`);
};

function createArticleFromPostedData(parsedArticleData){
	let articleToStore = parsedArticleData;

	articleToStore.publishStart = new Date(parsedArticleData.publishStartString);
	articleToStore.publishEnd = new Date(parsedArticleData.publishEndString);
	articleToStore.slug = helpers.getSlugFromName(articleToStore.title);

	delete articleToStore.publishStartString;
	delete articleToStore.publishEndString;

	return articleToStore;
};

function *getStandardPictures() {
	let files = yield fs.readdir(__dirname + '/../../site/public/img/articles');
	return files;
}


function formatDate(dateToFormat) {
	let dd = dateToFormat.getDate();
    let mm = dateToFormat.getMonth()+1; //January is 0!
    let yyyy = dateToFormat.getFullYear();

    if(mm<10){ mm='0'+mm };
    if(dd<10){ dd='0'+dd };

    return `${yyyy}-${mm}-${dd}`;
};