var mongoProdUri = process.env.MONGOLAB_URI || 'localhost:27017/ypkbksite_Prod';

var adminUser = {
	name : process.env.BASIC_USER || 'ypkbk',
	pass : process.env.BASIC_PASS || 'ypkbk'
};

var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongoUrl: 'localhost:27017/ypkbksite_dev',
		adminUser : adminUser
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mongoUrl: 'localhost:27017/ypkbksite_staging',
		adminUser : adminUser
	},
	prod: {
		mode: 'prod',
		port: process.env.PORT || 5000,
		mongoUrl: mongoProdUri,
		adminUser : adminUser
	}
};

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};