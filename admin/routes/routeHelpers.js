module.exports.getSlugFromName = function (name) {
	return name.split(' ').join('-');
};