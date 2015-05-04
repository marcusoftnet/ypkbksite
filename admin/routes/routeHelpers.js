'use strict';
let fs = require('co-fs');

module.exports.getSlugFromName = function (name) {
	return name.split(' ').join('-');
};

module.exports.getStandardPictures = function *(directoryName) {
	return yield fs.readdir(__dirname + '/../../site/public/img/' + directoryName);
};