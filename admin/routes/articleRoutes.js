"use strict";
let parse = require('co-body');

let render = require('../lib/render.js');
let db = require('../../lib/db.js');

module.exports.showNewArticlePage = function *() {
	let today = new Date();
	let sixMonthsAway = new Date();
	sixMonthsAway.setDate(today.getDate()+180);

	let dates = {
		publishStart : formatDate(today),
		publishEnd 	 : formatDate(sixMonthsAway)
	};

	this.body = yield render('article', { article : dates});
};

module.exports.storeNewArticle = function *() {
	let parsedArticleData = yield parse(this);
	parsedArticleData.slug = getSlugFromName(parsedArticleData.title);

	let inserted = yield db.articlesCollection.insert(parsedArticleData);
	let id = inserted._id;

	this.redirect(`/admin/article/${id}`);
};

module.exports.showArticlePage = function *(id) {
	let a = yield db.articlesCollection.findById(id);
	this.body = yield render('article', { article : a });
};

module.exports.updateArticle = function *(id) {
	let parsedArticleData = yield parse(this);
	parsedArticleData.slug = getSlugFromName(parsedArticleData.title);

	yield db.articlesCollection.updateById(id, parsedArticleData);

	this.redirect(`/admin/article/${id}`);
};

function getSlugFromName(name) {
	return name.split(' ').join('-');
};

function formatDate (dateToFormat) {
	let dd = dateToFormat.getDate();
    let mm = dateToFormat.getMonth()+1; //January is 0!
    let yyyy = dateToFormat.getFullYear();

    if(mm<10){ mm='0'+mm };
    if(dd<10){ dd='0'+dd };

    let a = `${yyyy}-${mm}-${dd}`;
    return a;
};