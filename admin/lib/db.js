"use strict";
let monk = require('monk');
let wrap = require('co-monk');
let config = require('../../config')();

function getCollection(mongoUrl, collectionName) {
	let db = monk(mongoUrl);
	return wrap(db.get(collectionName));
};

module.exports.hospitalCollection 	= getCollection(config.mongoUrl, 'hospitals');
module.exports.clinicsCollection 	= getCollection(config.mongoUrl, 'clinics');
module.exports.newsCollection 		= getCollection(config.mongoUrl, 'news');
module.exports.textsCollection 		= getCollection(config.mongoUrl, 'texts');
