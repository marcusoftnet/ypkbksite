"use strict";
let app = require('../');
let co = require('co');
let db = require('../../lib/db.js');
let testHelpers = require('../../test/testHelpers.js');
let should = require('should');
let request = require('supertest').agent(app.listen());

describe('Clinic administration', function(){

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});
	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to create new clinics', function (done) {
		request
			.get('/clinic/')
			.expect(200)
			.expect(function (res) {
				res.text.should.containEql('Buat klinik')
			})
			.end(done);
	});

	it('lists the standard pictures for articles', function (done) {
		request
			.get('/clinic/')
			.expect(200)
			.expect(function (res) {
				res.text.should.containEql('klinik.jpg');
				res.text.should.containEql('longmerah.jpg');
				res.text.should.containEql('muaramujan.jpg');
				res.text.should.containEql('gimpu.jpg');
			})
			.end(done);
	});

	it('stores data for a new clinic in the database', function (done) {
		co(function *() {
			let examplePostData = {
				name : "Klinik Ambon",
				city : "Ambon",
				clinicPhotoFileName : "ambon.jpg"
			};

			request
				.post("/clinic/")
				.send(examplePostData)
				.expect(302)
				.expect('location', /\/clinic\/[0-9a-fA-F]+$/)
				.end(function () {
					co(function *() {
						let clinic = yield db.clinicsCollection.findOne({ name: examplePostData.name});
						clinic.city.should.equal(examplePostData.city);
						clinic.clinicPhotoFileName.should.equal(examplePostData.clinicPhotoFileName);
					}).then(done, done);
				});
		});
	});

	it('creates a slug for the clinic based on the name', function (done) {
		co(function *() {
			let examplePostData = {
				name : "Catherine Booth Ambon"
			};

			request
				.post("/clinic/")
				.send(examplePostData)
				.end(function () {
					co(function *() {
						let clinic = yield db.clinicsCollection.findOne({ name: examplePostData.name});
						clinic.slug.should.equal("Catherine-Booth-Ambon");
					}).then(done, done);
				});
		});
	});

	it('shows information about an existing clinic', function  (done) {
		co(function * () {
			let insertedClinic = yield db.clinicsCollection.insert({ name:'Klinik Ambon'});

			let url = `/clinic/${insertedClinic._id}`;

			request
				.get(url)
				.expect(200)
				.expect(function (res) {
					res.text.should.containEql('Klinik Ambon');
				})
				.end(done);
		});
	});

	it('updates the information about an existing clinic', function (done) {
		co(function * () {
			let insertedClinic = yield db.clinicsCollection.insert({ name:'Klinik Ambon'});
			let url = `/clinic/${insertedClinic._id}`;

			let updatedClinicData = {
				name : 'Klinik Abmon II'
			};

			request
				.post(url)
				.send(updatedClinicData)
				.expect(302)
				.expect('location', `/admin${url}`)
				.end(function () {
					co(function *() {
						let clinic = yield db.clinicsCollection.findById(insertedClinic._id);
						clinic.name.should.equal('Klinik Abmon II');
					}).then(done, done);
				});
		});
	});
});