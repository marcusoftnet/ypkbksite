"use strict";

let supertest = require('supertest');
let staticNow = require('static-now');
let app = require("../");

describe('Site', function () {
    it('shows up nicely', function (done) {
        let request = supertest.agent(app.listen());
        request
            .get('/index.html')
            .expect(200)
            .end(done);
    });
});