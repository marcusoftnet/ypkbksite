"use strict";
let parse = require('co-body');

let render = require('../lib/render.js');
let db = require('../lib/db.js');

module.exports.showNewHospitalPage = function *() {
	this.body = yield render('hospital');
};

module.exports.storeNewHospital = function *() {
	let parsedHospitalData = yield parse(this);
	parsedHospitalData.slug = getSlugFromName(parsedHospitalData.name);

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
	parsedHospitalData.slug = getSlugFromName(parsedHospitalData.name);

	yield db.hospitalCollection.updateById(id, parsedHospitalData);

	this.redirect(`/admin/hospital/${id}`);
};

function getSlugFromName(name) {
	return name.split(' ').join('-');
}