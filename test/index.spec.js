"use strict";

let supertest = require('supertest');

let app = require("../");
let config = require('../config')();

let request = supertest.agent(app.listen());

describe('Mounting of parts', function () {
    it('the site shows up nicely', function (done) {
        request
            .get('/')
            .expect(200)
            .end(done);
    });
    it('the admin part shows up, when you log in', function (done) {
    	request
			.get('/admin')
			.auth(config.adminUser.name, config.adminUser.pass)
			.expect(200)
			.end(done);
    });
    it('the admin part doesnt shows up, when you not log in', function (done) {
    	request
			.get('/admin')
			.expect(401)
			.end(done);
    });
});