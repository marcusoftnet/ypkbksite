"use strict";
let app = require('../');
let co = require('co');
let db = require('../../lib/db.js');
let testHelpers = require('../../test/testHelpers.js');
let should = require('should');
let request = require('supertest').agent(app.listen());

describe('Administration site home page', function(){
	it('shows up without errors', function (done) {
		request
			.get('/')
			.expect(200)
			.end(done);
	});
	it('has a button to create new hospital', function (done) {
		request
			.get('/')
			.expect(function (res) {
				res.text.should.containEql("<button>Buat rumah sakit baru</button>")
			})
			.end(done);
	});
	it('has a button to create new clinic', function (done) {
		request
			.get('/')
			.expect(function (res) {
				res.text.should.containEql("<button>Buat klinik baru</button>")
			})
			.end(done);
	});
	it('has a button to create new news items', function (done) {
		request
			.get('/')
			.expect(function (res) {
				res.text.should.containEql("<button>Buat artikel baru</button>")
			})
			.end(done);
	});
	it('has a button to create new text', function (done) {
		request
			.get('/')
			.expect(function (res) {
				res.text.should.containEql("<button>Buat text lain-lain baru</button>")
			})
			.end(done);
	});

	describe('has lists of', function () {
		beforeEach(function (done) {
			testHelpers.removeAllDocs(done);
		});
		afterEach(function (done) {
			testHelpers.removeAllDocs(done);
		});

		it('hospitals', function (done) {
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
		it('clinics', function (done) {
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
		it('articles', function (done) {
			co(function *() {
				yield [
					db.articlesCollection.insert({title: "Title with number 1"}),
					db.articlesCollection.insert({title: "Title with number 2"}),
					db.articlesCollection.insert({title: "Title with number 3"}),
					db.articlesCollection.insert({title: "Title with number 4"})
				];

			request
				.get('/')
				.expect(function (res) {
					res.text.should.containEql("Title with number 1");
					res.text.should.containEql("Title with number 2");
					res.text.should.containEql("Title with number 3");
					res.text.should.containEql("Title with number 4");
				})
				.end(done);
			});
		});

		it('articles are sorted on publish start date', function (done) {
			co(function *() {
				yield [
					db.articlesCollection.insert({title: "Title with number 1", publishStart : new Date("2015-04-04")}),
					db.articlesCollection.insert({title: "Title with number 3", publishStart : new Date("2015-04-02")}),
					db.articlesCollection.insert({title: "Title with number 2", publishStart : new Date("2015-04-03")}),
					db.articlesCollection.insert({title: "Title with number 4", publishStart : new Date("2015-04-01")})
				];

			request
				.get('/')
				.expect(function (res) {
					res.text.should.containEql("Title with number 1");
					res.text.should.containEql("Title with number 2");
					res.text.should.containEql("Title with number 3");
					res.text.should.containEql("Title with number 4");
				})
				.end(done);
			});
		});

		it('texts', function (done) {
			co(function *() {
				yield [
					db.textsCollection.insert({slug: "slug_1"}),
					db.textsCollection.insert({slug: "slug_2"}),
					db.textsCollection.insert({slug: "slug_3"}),
					db.textsCollection.insert({slug: "slug_4"})
				];

			request
				.get('/')
				.expect(function (res) {
					res.text.should.containEql("slug_1");
					res.text.should.containEql("slug_2");
					res.text.should.containEql("slug_3");
					res.text.should.containEql("slug_4");
				})
				.end(done);
			});
		});
		it('texts are sorted alphabetical on slugs', function (done) {
			co(function *() {
				yield [
					db.textsCollection.insert({slug: "slug_2"}),
					db.textsCollection.insert({slug: "slug_3"}),
					db.textsCollection.insert({slug: "slug_1"}),
					db.textsCollection.insert({slug: "slug_4"})
				];

			request
				.get('/')
				.expect(function (res) {
					res.text.should.containEql("slug_1");
					res.text.should.containEql("slug_2");
					res.text.should.containEql("slug_3");
					res.text.should.containEql("slug_4");
				})
				.end(done);
			});
		});
	});
});