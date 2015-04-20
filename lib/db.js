"use strict";
let monk = require('monk');
let wrap = require('co-monk');
let config = require('../config')();

function getCollection(mongoUrl, collectionName) {
	let db = monk(mongoUrl);
	return wrap(db.get(collectionName));
};

module.exports.hospitalsCollection 	= getCollection(config.mongoUrl, 'hospitals');
module.exports.clinicsCollection 	= getCollection(config.mongoUrl, 'clinics');
module.exports.articlesCollection 	= getCollection(config.mongoUrl, 'articles');
module.exports.textsCollection 		= getCollection(config.mongoUrl, 'texts');
