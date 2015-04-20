"use strict";
let app = require('../');
let co = require('co');
let db = require('../../lib/db.js');
let testHelpers = require('../../test/testHelpers.js');
let should = require('should');
let request = require('supertest').agent(app.listen());

describe('Text administration', function(){

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});
	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to create a new text', function (done) {
		request
			.get('/text/')
			.expect(200)
			.expect(function (res) {
				res.text.should.containEql('Buat teks lain-lain')
			})
			.end(done);
	});

	it('stores data for a new text in the database', function (done) {
		co(function *() {
			let examplePostData = {
				slug : "ypkbk_name",
				text : "Yayasan Pelayanan Kesehatan Bala Keselamatan"
			};

			request
				.post("/text/")
				.send(examplePostData)
				.expect(302)
				.expect('location', /\/text\/[0-9a-fA-F]+$/)
				.end(function () {
					co(function *() {
						let text = yield db.textsCollection.findOne({ name: hospitalName});
						text.slug.should.equal(examplePostData.slug);
						text.text.should.equal(examplePostData.text);
					})(done());
				});
		});
	});


	it('shows the edit page for an existing text', function  (done) {
		co(function * () {
			let insertedText = yield db.textsCollection.insert({ slug : "ypkbk_name", text : "YPKBK"});

			let url = `/text/${insertedText._id}`;

			request
				.get(url)
				.expect(200)
				.expect(function (res) {
					res.text.should.containEql('YPKBK');
				})
				.end(done);
		});
	});

	it('updates an existing text', function (done) {
		co(function * () {
			let insertedText = yield db.textsCollection.insert({ slug : "ypkbk_name", text : "YPKBK"});
			let url = `/text/${insertedText._id}`;

			let updatedTextData = {
				slug : 'ypkbk_name_2'
			};

			request
				.post(url)
				.send(updatedTextData)
				.expect(302)
				.expect('location', `/admin${url}`)
				.end(function () {
					co(function *() {
						try {
							let text = yield db.textsCollection.findById(insertedText._id);
							text.slug.should.equal(updatedTextData.slug);
							console.log("CHECKED DB");
						}
						catch(e){
							console.log("THAT'S AN ERROR");
						}
					})(done());
				});
		});
	});
});