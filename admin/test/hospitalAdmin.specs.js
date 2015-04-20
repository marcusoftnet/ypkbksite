"use strict";
let app = require('../');
let co = require('co');
let db = require('../../lib/db.js');
let testHelpers = require('../../test/testHelpers.js');
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
				res.text.should.containEql('Buat rumah sakit')
			})
			.end(done);
	});

	it('stores data for a new hospital in the database', function (done) {
		co(function *() {
			let examplePostData = {
				name : "RS Bungsu",
				city : "Bandung",
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
						let hospital = yield db.hospitalsCollection.findOne({ name: hospitalName});
						hospital.city.should.equal(examplePostData.city);
						hospital.fokusArea.should.equal(examplePostData.fokusArea);
					})(done());
				});
		});
	});

	it('creates a slug for the hospital based on the name', function (done) {
		co(function *() {
			let examplePostData = {
				name : "Rumah Sakit William Booth Semarang"
			};

			// TODO: The expectation below doesn't work

			request
				.post("/hospital/")
				.send(examplePostData)
				.end(function () {
					co(function *() {
						let hospital = yield [db.hospitalsCollection.findOne({ name: hospitalName})];
						hospital.slug.should.equal("Rumah-Sakit-William-Booth-Semarang");
						console.log("YES!");
					})(done());
				});
		});
	});

	it('shows information about an existing hospital', function  (done) {
		co(function * () {
			let insertedHospital = yield db.hospitalsCollection.insert({ name:'Rumah Sakit Turen'});

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

	it('updates the information about an existing hospital', function (done) {
		co(function * () {
			let insertedHospital = yield db.hospitalsCollection.insert({ name:'Rumah Sakit Turen'});
			let url = `/hospital/${insertedHospital._id}`;

			let updatedHospitalData = {
				name : 'RS Bungsu'
			};

			request
				.post(url)
				.send(updatedHospitalData)
				.expect(302)
				.expect('location', `/admin${url}`)
				.end(function () {
					co(function *() {
						let hospital = yield db.hospitalsCollection.findById(insertedHospital._id);
						hospital.name.should.equal('RS Bungsu');
					})(done());
				});
		});
	});
});