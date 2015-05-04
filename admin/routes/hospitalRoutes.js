"use strict";
let parse = require('co-body');

let render = require('../lib/render.js');
let db = require('../../lib/db.js');

let helpers = require("./routeHelpers.js");

module.exports.showNewHospitalPage = function *() {
	let pictures = yield helpers.getStandardPictures('hospitals');
	this.body = yield render('hospital', { standardPictures : pictures });
};

module.exports.storeNewHospital = function *() {
	let parsedHospitalData = yield parse(this);
	parsedHospitalData.slug = helpers.getSlugFromName(parsedHospitalData.name);

	let inserted = yield db.hospitalsCollection.insert(parsedHospitalData);
	let id = inserted._id;

	this.redirect(`/admin/hospital/${id}`);
};

module.exports.showHospitalPage = function *(id) {
	let h = yield db.hospitalsCollection.findById(id);
	let pictures = yield helpers.getStandardPictures('hospitals');
	
	this.body = yield render('hospital', { hospital : h, standardPictures : pictures });
};

module.exports.updateHospital = function *(id) {
	let parsedHospitalData = yield parse(this);
	parsedHospitalData.slug = helpers.getSlugFromName(parsedHospitalData.name);

	yield db.hospitalsCollection.updateById(id, parsedHospitalData);

	this.redirect(`/admin/hospital/${id}`);
};