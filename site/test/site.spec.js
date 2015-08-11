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

    describe('renders hospitals on home page', function () {
            
        it('from database', function  (done) {
        	co(function *() {
        		yield [
        			db.hospitalsCollection.insert({name: "RS 1", rsPhotoFileName:""}),
        			db.hospitalsCollection.insert({name: "RS 2", rsPhotoFileName:""}),
        			db.hospitalsCollection.insert({name: "RS 3", rsPhotoFileName:""}),
        			db.hospitalsCollection.insert({name: "RS 4", rsPhotoFileName:""})
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

        it('images using filesnames gets the /img/hospitals prefix', function (done) {
            co(function *() {
                yield db.hospitalsCollection.insert(
                    {name: "RS 1", rsPhotoFileName : 'rs1picture.jpg'}
                );

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql('<img src="img/hospitals/rs1picture.jpg"');
                    })
                    .end(done);
            });
        });

        it('images using http-links are outputted raw', function (done) {
            co(function *() {
                yield db.hospitalsCollection.insert(
                    {name: "RS 1", rsPhotoFileName : 'https://farm8.staticflickr.com/7584/16596141074_afeebb86ed_m_d.jpg'}
                );

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql('<img src="https://farm8.staticflickr.com/7584/16596141074_afeebb86ed_m_d.jpg"');
                    })
                    .end(done);
            });
        });
    });

    describe('renders clinics on home page', function () {
        it('from database', function  (done) {
            co(function *() {
                yield [
                    db.clinicsCollection.insert({name: "Klinik 1", clinicPhotoFileName : ""}),
                    db.clinicsCollection.insert({name: "Klinik 2", clinicPhotoFileName : ""}),
                    db.clinicsCollection.insert({name: "Klinik 3", clinicPhotoFileName : ""}),
                    db.clinicsCollection.insert({name: "Klinik 4", clinicPhotoFileName : ""})
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

        it('images using filesnames gets the /img/hospitals prefix', function (done) {
            co(function *() {
                yield db.clinicsCollection.insert(
                    {name: "Klinik 1", clinicPhotoFileName : 'klinik1picture.jpg'}
                );

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql('<img src="img/clinics/klinik1picture.jpg"');
                    })
                    .end(done);
            });
        });
        
        it('images using http-links are outputted raw', function (done) {
            co(function *() {
                yield db.clinicsCollection.insert(
                    {name: "Klinik 1", clinicPhotoFileName : 'https://farm8.staticflickr.com/7584/16596141074_afeebb86ed_m_d.jpg'}
                );

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql('<img src="https://farm8.staticflickr.com/7584/16596141074_afeebb86ed_m_d.jpg"');
                    })
                    .end(done);
            });
        });
    });

    describe('renders texts on home page', function () {
        it('from database', function  (done) {
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

    describe('renders articles, but they are special. They: ', function  () {
        let today = new Date();
        let tomorrow = new Date();
        let yesterday = new Date();

        beforeEach(function (done) {
            today.setHours(0,0,0,0);
            tomorrow.setDate(today.getDate()+1);
            yesterday.setDate(today.getDate()- 1);
            tomorrow.setHours(0,0,0,0);
            yesterday.setHours(0,0,0,0);
            done();
        });

        it('output articles from database', function  (done) {
            co(function *() {
                yield [
                    db.articlesCollection.insert({title: "Article 1", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "Article 2", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "Article 3", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "Article 4", publishStart : today, publishEnd : tomorrow })
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

        it('only show up when they are published', function  (done) {
            co(function *() {
                yield [
                    db.articlesCollection.insert({title: "should show - published today", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "should not be shown - enddate passed", publishStart : yesterday, publishEnd : yesterday}),
                    db.articlesCollection.insert({title: "should not be shown - started not yet occurred", publishStart : tomorrow, publishEnd : tomorrow})
                ];

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql("should show - published today");
                        res.text.should.not.containEql("should not be shown - enddate passed");
                        res.text.should.not.containEql("should not be shown - started not yet occurred");
                    })
                    .end(done);
            });
        });

        it('articles are NOT shown if start date is after today', function  (done) {
            co(function *() {
                yield db.articlesCollection.insert({title: "should not be shown - started not yet occurred", publishStart : tomorrow, publishEnd : tomorrow});

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.not.containEql("should not be shown - started not yet occurred");
                    })
                    .end(done);
            });
        });

        it('articles are NOT shown if end date is before today', function  (done) {
            co(function *() {
                yield db.articlesCollection.insert({title: "should not be shown - enddate passed", publishStart : yesterday, publishEnd : yesterday});

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.not.containEql("should not be shown - enddate passed");
                    })
                    .end(done);
            });
        });

        it('articles are shown only if start date is before today and end date is after today', function  (done) {
            co(function *() {
                yield db.articlesCollection.insert({title: "should show - published today", publishStart : today, publishEnd : tomorrow });

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql("should show - published today");
                    })
                    .end(done);
            });
        });

        it('have a default image if no image is supplied', function  () {
            co(function *() {
                yield [
                    db.articlesCollection.insert({imgURL : "/img/header-bg.jpg", title: "has image", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "doesnt have image", publishStart : today, publishEnd : tomorrow })
                ];

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql("/img/header-bg.jpg");
                        res.text.should.containEql("/img/new/defaultNews2.png");
                    })
                    .end(done);
            });
        });
        
        it('uses the start of the content as intro if no intro is supplied', function (done) {
            co(function *() {
                yield [
                    db.articlesCollection.insert(
                        {
                            title: "no intro",
                            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a",
                            publishStart : today,
                            publishEnd : tomorrow
                        }
                    ),
                    db.articlesCollection.insert(
                        {
                            title: "has intro",
                            content: "Lorem ipsum",
                            intro: "The intro text is short and sweet",
                            publishStart : today,
                            publishEnd : tomorrow
                        }
                    )
                ];

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql("The intro text is short and sweet");
                        res.text.should.containEql("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...");
                    })
                    .end(done);
            });
        });
    });
});