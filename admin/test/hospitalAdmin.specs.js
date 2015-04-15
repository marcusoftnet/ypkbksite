"use strict";
let app = require('../');
let co = require('co');
let db = require('../lib/db.js');

let should = require('should');
let request = require('supertest').agent(app.listen());

describe('Hospital administration', function(){
	it('has a page to create new hospitals', function (done) {
		request
			.get('/hospital/new')
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
				.post("/hospital/new")
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
	it('updates the information about an existing hospital');
});