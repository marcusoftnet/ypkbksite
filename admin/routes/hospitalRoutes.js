"use strict";
let parse = require('co-body');

let render = require('../lib/render.js');
let db = require('../lib/db.js');

module.exports.showNewHospitalPage = function *() {
	this.body = yield render('hospital_new');
};

module.exports.storeNewHospital = function *() {
	let parsedHospitalData = yield parse(this);

	let inserted = yield db.hospitalCollection.insert(parsedHospitalData);
	let id = inserted._id;

	this.redirect(`/hospital/${id}`);
};