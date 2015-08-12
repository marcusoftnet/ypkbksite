"use strict";

let supertest = require('supertest');
let co = require('co');
let should = require('should');

let app = require('../');
let db = require('../../lib/db.js');
let config = require('../../config')();
let testHelpers = require('../../test/testHelpers.js');

let request = supertest.agent(app.listen());

describe('The site has modal windows ', function () {
	let today = new Date();
    let tomorrow = new Date();
    let yesterday = new Date();

    beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

    it('for articles', function  (done) {
        co(function *() {

        	today.setHours(0,0,0,0);
            tomorrow.setDate(today.getDate()+1);
            yesterday.setDate(today.getDate()- 1);
            tomorrow.setHours(0,0,0,0);
            yesterday.setHours(0,0,0,0);

            yield db.articlesCollection.insert({
            	title: "Article 1", 
            	slug: "article-1", 
            	publishStart : today, 
            	publishEnd : tomorrow 
            });

            request
                .get('/article/article-1')
                .expect(function (res) {
                    res.text.should.containEql("Article 1");
                })
                .end(done);
        });
	});

	it('for hospitals', function  (done) {
        co(function *() {
            yield db.hospitalsCollection.insert(
                {
                    name: "RS 1", 
                    slug: "RS-1-CSWB",
                    rsPhotoFileName:"/img/hospitals/rs1.jpg"
                }
            );

            request
                .get('/hospital/RS-1-CSWB')
                .expect(function (res) {
                    res.text.should.containEql("RS 1");
                    res.text.should.containEql("/img/hospitals/rs1.jpg");
                })
                .end(done);
        });
    });
	it('for clinics', function (done) {
         co(function *() {
            yield db.clinicsCollection.insert(
                {
                    name: "Klinik 1", 
                    slug: "klinik-1-slug",
                    clinicPhotoFileName : "/img/clinic/klini1.jpg"
                }
            );

            request
                .get('/clinic/klinik-1-slug')
                .expect(function (res) {
                    res.text.should.containEql("Klinik 1");
                    res.text.should.containEql("/img/clinic/klini1.jpg");
                })
                .end(done);
        });
    });
});