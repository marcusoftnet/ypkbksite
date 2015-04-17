"use strict";

let supertest = require('supertest');
let co = require('co');
let should = require('should');

let app = require('../');
let db = require('../lib/db.js');
let config = require('../../config')();
let testHelpers = require('./testHelpers.js');

let request = supertest.agent(app.listen());

describe('The main site', function () {

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

    it('renders without errors', function (done) {
        request
            .get('/')
            .expect(200)
            .end(done);
    });

    it('outputs dynamic hospital information', function  (done) {
    	co(function *() {
    		yield [
    			db.hospitalCollection.insert({name: "RS 1"}),
    			db.hospitalCollection.insert({name: "RS 2"}),
    			db.hospitalCollection.insert({name: "RS 3"}),
    			db.hospitalCollection.insert({name: "RS 4"})
    		];

    		request
	            .get('/')
	            .expect(function (res) {
	            	res.text.should.containEql("RS 1");
	            	res.text.should.containEql("RS 2");
	            	res.text.should.containEql("RS 3");
	            	res.text.should.containEql("RS 4");
	            })
	            .end(done);
	    });
    });

    it('outputs dynamic texts', function  (done) {
        co(function *() {
            yield [
                db.textsCollection.insert({slug: "ypkbk_name", text: "Yayasan"})
            ];

            request
                .get('/')
                .expect(function (res) {
                    res.text.should.containEql("Yayasan");
                })
                .end(done);
        });
    });

});