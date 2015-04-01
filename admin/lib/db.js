let monk = require('monk');
let wrap = require('co-monk');

module.exports.chunks = function (mongoUrl) {
	let db = monk(mongoUrl);
	return wrap(db.get('chunks'));
};