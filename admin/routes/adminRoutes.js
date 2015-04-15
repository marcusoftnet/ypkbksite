"use strict";
let render = require('../lib/render.js');

module.exports.showAdminHome = function *() {
	let hospitals = []; // TODO: Get hospital from db
	let vm = { hospitals : hospitals };

	this.body = yield render('index', vm);
};