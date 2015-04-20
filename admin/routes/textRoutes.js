"use strict";
let parse = require('co-body');

let render = require('../lib/render.js');
let db = require('../../lib/db.js');

module.exports.showNewTextPage = function *() {
	this.body = yield render('text');
};

module.exports.storeNewText = function *() {
	let parsedText = yield parse(this);

	let storedText = yield db.textsCollection.insert(parsedText);

	this.redirect(`/admin/text/${storedText._id}`);
};

module.exports.showTextPage = function *(id) {
	let t = yield db.textsCollection.findById(id);
	this.body = yield render('text', { text : t });
};

module.exports.updateText = function *(id) {
	let parsedText = yield parse(this);

	yield db.textsCollection.updateById(id, parsedText);

	this.redirect(`/admin/text/${id}`);
};

function getSlugFromName(name) {
	return name.split(' ').join('-');
}