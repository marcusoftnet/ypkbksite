"use strict";

let supertest = require('supertest');
let co = require('co');
let should = require('should');

let app = require('../');
let db = require('../../lib/db.js');
let config = require('../../config')();
let testHelpers = require('../../test/testHelpers.js');

let request = supertest.agent(app.listen());

describe('The Contact Us feature', function () {

	let emailPostData = {};
	beforeEach(function (done) {
		emailPostData = {
			to : "to@to.com",
			name: "The Name",
			phone: "+62 222 222 2222",
			email: "email@email.com",
			message: "A nice message!"
        };
        done();
	});

	it('sends emails to the correct address', function (done) {
	    request
	        .post('/sendemail')
	        .send(emailPostData)
	        .expect(200)
	        .expect(function (res) {
	        	res.body.to.should.equal("to@to.com");
	        })
	        .end(done);
	});

	it('sends emails from the correct address', function (done) {
	    request
	        .post('/sendemail')
	        .send(emailPostData)
	        .expect(200)
	        .expect(function (res) {
	        	res.body.from.should.equal("email@email.com");
	        })
	        .end(done);
	});

	it('sends emails with the correct subject', function (done) {
	    request
	        .post('/sendemail')
	        .send(emailPostData)
	        .expect(200)
	        .expect(function (res) {
	        	res.body.subject.should.equal("From: The Name (+62 222 222 2222)");
	        })
	        .end(done);
	});

	it('sends emails with the correct content', function (done) {
	    request
	        .post('/sendemail')
	        .send(emailPostData)
	        .expect(200)
	        .expect(function (res) {
	        	res.body.text.should.equal("A nice message!");
	        })
	        .end(done);
	});
});