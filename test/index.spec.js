"use strict";

let supertest = require('supertest');
let staticNow = require('static-now');
let app = require("../");
let config = require('../config');

describe('Mounting of parts', function () {
    it('the site shows up nicely', function (done) {
        let request = supertest.agent(app.listen());
        request
            .get('/index.html')
            .expect(200)
            .end(done);
    });
   //  it('the admin part shows up, when you log in', function (done) {
   //  	request
			// .get('/admin')
			// .auth(config.adminUser.name, testHelpers.adminUser.pass)
			// .expect(200)
			// .end(done);
   //  });
});