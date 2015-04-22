"use strict";
let config = require('../config')();
let parse = require('co-body');
let sendGridConnector = require('sendgrid');

module.exports.sendEmail = function *() {
	let parsedEmailForm = yield parse(this);

	let sendGridParameters = {
	    	to: parsedEmailForm.to,
	    	from: parsedEmailForm.email,
	    	subject: 'From: ' + parsedEmailForm.name + ' (' + parsedEmailForm.phone + ')',
	    	text: parsedEmailForm.message
		};

	let status = 200;
	let bodyText = sendGridParameters;

	if(config.mode === 'prod'){
		let sendgrid = sendGridConnector(config.sendGridUser.name, config.sendGridUser.pass);

		sendgrid.send(
			sendGridParameters,
			function(err, json) {
		    	if (err) {
		    		bodyText = err.message;
		    		status = 400;
		    	}
			}
		);
	}

	this.body = bodyText;
	this.status = status;
};