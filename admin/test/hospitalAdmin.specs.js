"use strict";
let app = require('../');
let co = require('co');
let db = require('../lib/db.js');
let testHelpers = require('./testHelpers.js');
let should = require('should');
let request = require('supertest').agent(app.listen());

describe('Hospital administration', function(){

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});
	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to create new hospitals', function (done) {
		request
			.get('/hospital/')
			.expect(200)
			.expect(function (res) {
				res.text.should.containEql('<button>Buat rumah sakit</button>')
			})
			.end(done);
	});
	it('stores data for a new hospital in the database', function (done) {
		co(function *() {
			let examplePostData = {
				name : "RS Bungsu",
				fokusArea : "Ibu dan Anak",
				rsPhotoFileName : "rsbu-bandung.jpg"
			};

			request
				.post("/hospital/")
				.send(examplePostData)
				.expect(302)
				.expect('location', /\/hospital\/[0-9a-fA-F]+$/)
				.end(function () {
					co(function *() {
						let hospital = yield db.hospitalCollection.findOne({ name: hospitalName});
						hospital.fokusArea.should.equal(examplePostData.fokusArea);
					})(done());
				});
		});
	});
	it('shows information about an existing hospital', function  (done) {
		co(function * () {
			let insertedHospital = yield db.hospitalCollection.insert({ name:'Rumah Sakit Turen'});

			let url = `/hospital/${insertedHospital._id}`;

			request
				.get(url)
				.expect(200)
				.expect(function (res) {
					res.text.should.containEql('Rumah Sakit Turen');
				})
				.end(done);
		});
	});
	it('updates the information about an existing hospital');
});