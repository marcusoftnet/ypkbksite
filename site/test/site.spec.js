"use strict";

let supertest = require('supertest');
let co = require('co');
let should = require('should');

let app = require('../');
let db = require('../../lib/db.js');
let config = require('../../config')();
let testHelpers = require('../../test/testHelpers.js');

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
    			db.hospitalsCollection.insert({name: "RS 1"}),
    			db.hospitalsCollection.insert({name: "RS 2"}),
    			db.hospitalsCollection.insert({name: "RS 3"}),
    			db.hospitalsCollection.insert({name: "RS 4"})
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

    it('outputs dynamic clinic information', function  (done) {
        co(function *() {
            yield [
                db.clinicsCollection.insert({name: "Klinik 1"}),
                db.clinicsCollection.insert({name: "Klinik 2"}),
                db.clinicsCollection.insert({name: "Klinik 3"}),
                db.clinicsCollection.insert({name: "Klinik 4"})
            ];

            request
                .get('/')
                .expect(function (res) {
                    res.text.should.containEql("Klinik 1");
                    res.text.should.containEql("Klinik 2");
                    res.text.should.containEql("Klinik 3");
                    res.text.should.containEql("Klinik 4");
                })
                .end(done);
        });
    });

    it('outputs dynamic articles', function  (done) {
        co(function *() {
            yield [
                db.articlesCollection.insert({title: "Article 1"}),
                db.articlesCollection.insert({title: "Article 2"}),
                db.articlesCollection.insert({title: "Article 3"}),
                db.articlesCollection.insert({title: "Article 4"})
            ];

            request
                .get('/')
                .expect(function (res) {
                    res.text.should.containEql("Article 1");
                    res.text.should.containEql("Article 2");
                    res.text.should.containEql("Article 3");
                    res.text.should.containEql("Article 4");
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