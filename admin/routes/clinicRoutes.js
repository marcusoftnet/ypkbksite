"use strict";
let parse = require('co-body');

let render = require('../lib/render.js');
let db = require('../../lib/db.js');

let helpers = require("./routeHelpers.js");

module.exports.showNewClinicPage = function *() {
	this.body = yield render('clinic');
};

module.exports.storeNewClinic = function *() {
	let parsedClinicData = yield parse(this);
	parsedClinicData.slug = helpers.getSlugFromName(parsedClinicData.name);

	let inserted = yield db.clinicsCollection.insert(parsedClinicData);
	let id = inserted._id;

	this.redirect(`/admin/clinic/${id}`);
};

module.exports.showClinicPage = function *(id) {
	let c = yield db.clinicsCollection.findById(id);
	this.body = yield render('clinic', { clinic : c });
};

module.exports.updateClinic = function *(id) {
	let parsedClinicData = yield parse(this);
	parsedClinicData.slug = helpers.getSlugFromName(parsedClinicData.name);

	yield db.clinicsCollection.updateById(id, parsedClinicData);

	this.redirect(`/admin/clinic/${id}`);
};