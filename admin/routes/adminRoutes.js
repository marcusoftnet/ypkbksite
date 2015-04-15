"use strict";
let render = require('../lib/render.js');
let db = require('../lib/db.js');

module.exports.showAdminHome = function *() {
	let hospitals = yield db.hospitalCollection.find({});
	let vm = { hospitals : hospitals };

	this.body = yield render('index', vm);
};