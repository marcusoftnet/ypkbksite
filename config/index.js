var mongoProdUri = process.env.MONGOLAB_URI || 'localhost:27017/ypkbksite_Prod';

var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongoUrl: 'localhost:27017/ypkbksite_Prod'
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mongoUrl: 'localhost:27017/ypkbksite_Prod'
	},
	prod: {
		mode: 'prod',
		port: process.env.PORT || 5000,
		mongoUrl: mongoProdUri
	}
};

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};