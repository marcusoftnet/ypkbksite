"use strict";
let parse = require('co-body');

let render = require('../lib/render.js');
let db = require('../lib/db.js');

module.exports.showNewHospitalPage = function *() {
	this.body = yield render('hospital'); // TODO: Reuse hospital template
};

module.exports.storeNewHospital = function *() {
	let parsedHospitalData = yield parse(this);

	let inserted = yield db.hospitalCollection.insert(parsedHospitalData);
	let id = inserted._id;

	this.redirect(`/admin/hospital/${id}`);
};

module.exports.showHospitalPage = function *(id) {
	let h = yield db.hospitalCollection.findById(id);
	this.body = yield render('hospital', { hospital : h });
};

module.exports.updateHospital = function *(id) {
	let parsedHospitalData = yield parse(this);

	yield db.hospitalCollection.updateById(id, parsedHospitalData);

	this.redirect(`/admin/hospital/${id}`);
};