"use strict";

let staticnow = require("static-now");
let config = require("./config")();

let app = staticnow({
	log : true,
	portnumber : config.port,
	directory:__dirname + "/public"
});

module.exports = app;