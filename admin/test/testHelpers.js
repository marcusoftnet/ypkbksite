'use strict';
let db = require('../../lib/db.js');
let co = require('co');

module.exports.removeAllDocs = function(done){
	co(function *(){
		yield db.hospitalsCollection.remove({});
		yield db.clinicsCollection.remove({});
		yield db.newsCollection.remove({});
		yield db.textsCollection.remove({});
		done();
	});
};