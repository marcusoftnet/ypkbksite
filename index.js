var staticnow = require("static-now");
var config = require("./config")();

var app = staticnow({
	log : true,
	portnumber : config.port,
	directory:__dirname + "/public"
});

module.exports = app;