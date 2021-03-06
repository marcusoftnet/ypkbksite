'use strict';
let db = require('../lib/db.js');
let co = require('co');

module.exports.removeAllDocs = function(done){
	co(function *(){
		yield [
			db.hospitalsCollection.remove({}),
			db.clinicsCollection.remove({}),
			db.articlesCollection.remove({}),
			db.textsCollection.remove({})
		];
		done();
	});
};