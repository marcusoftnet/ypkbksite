"use strict";

let supertest = require('supertest');

let app = require("../");
let config = require('../../config')();

let request = supertest.agent(app.listen());

describe('Site rendering', function () {
    it('the site shows up nicely', function (done) {
        request
            .get('/')
            .expect(200)
            .end(done);
    });
});