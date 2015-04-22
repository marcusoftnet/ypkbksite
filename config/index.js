var mongoProdUri = process.env.MONGOLAB_URI || 'localhost:27017/ypkbksite_Prod';

var sendGridUser = {
	name : process.env.SENDGRID_USERNAME || '',
	pass : process.env.SENDGRID_PASSWORD || ''
};

var adminUser = {
	name : process.env.BASIC_USER || 'ypkbk',
	pass : process.env.BASIC_PASS || 'ypkbk'
};

var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongoUrl: 'localhost:27017/ypkbksite_dev',
		adminUser : adminUser,
		sendGridUser : sendGridUser
	},
	testing: {
		mode: 'testing',
		port: 4000,
		mongoUrl: 'localhost:27017/ypkbksite_test',
		adminUser : adminUser,
		sendGridUser : sendGridUser
	},
	prod: {
		mode: 'prod',
		port: process.env.PORT || 5000,
		mongoUrl: mongoProdUri,
		adminUser : adminUser,
		sendGridUser : sendGridUser
	}
};

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};