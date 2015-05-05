"use strict";
let app = require('../');
let co = require('co');
let db = require('../../lib/db.js');
let testHelpers = require('../../test/testHelpers.js');
let should = require('should');
let request = require('supertest').agent(app.listen());

describe('Articles administration', function(){

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});
	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to create new articles', function (done) {
		request
			.get('/article/')
			.expect(200)
			.expect(function (res) {
				res.text.should.containEql('Buat artikel baru')
			})
			.end(done);
	});

	it('lists the standard pictures for articles', function (done) {
		request
			.get('/article/')
			.expect(200)
			.expect(function (res) {
				res.text.should.containEql('defaultNews.png');
			})
			.end(done);
	});

	it('stores data for a new article in the database', function (done) {
		co(function *() {
			let examplePostData = {
				title : "Title title",
				intro : "Intro intro",
				content : "content",
				publishStartString : "2015-01-01",
				publishEndString : "2015-10-01"
			};

			request
				.post("/article/")
				.send(examplePostData)
				.expect(302)
				.expect('location', /\/article\/[0-9a-fA-F]+$/)
				.end(function () {
					co(function *() {
						let article = yield db.articlesCollection.findOne({ title: examplePostData.title});
						article.intro.should.equal(examplePostData.intro);
						// article.content.should.equal(examplePostData.content);
						article.content.should.equal("ARNE");
					}).then(done, done);
				});
		});
	});

	it('creates a slug for the article based on the title', function (done) {
		co(function *() {
			let examplePostData = {
				title : "Title Title Title",
				publishStartString : "2015-01-01",
				publishEndString : "2015-10-01"
			};

			request
				.post("/article/")
				.send(examplePostData)
				.end(function () {
					co(function *() {
						let article = yield db.articlesCollection.findOne({ title: examplePostData.title });
						article.slug.should.equal("Title-Title-Title");
					})(done());
				});
		});
	});

	it('shows information about an existing article', function  (done) {
		co(function * () {
			let insertedArticle = yield db.articlesCollection.insert({ title:'Title title', publishStart : new Date("2015-01-01"), publishEnd : new Date("2015-10-01") });

			let url = `/article/${insertedArticle._id}`;

			request
				.get(url)
				.expect(200)
				.expect(function (res) {
					res.text.should.containEql('Title title');
				})
				.end(done);
		});
	});

	it('updates the information about an existing article', function (done) {
		co(function * () {
			let insertedArticle = yield db.articlesCollection.insert({ title:'Title title', publishStart : new Date("2015-01-01"), publishEnd : new Date("2015-10-01")});
			let url = `/article/${insertedArticle._id}`;

			let updatedArticlePostData = {
				title : 'Title',
				publishStartString : "2015-02-01",
				publishEndString : "2015-12-01"
			};

			request
				.post(url)
				.send(updatedArticlePostData)
				.expect(302)
				.expect('location', `/admin${url}`)
				.end(function () {
					co(function *() {
						let article = yield db.articlesCollection.findById(insertedArticle._id);
						article.title.should.equal('Title');
					})(done());
				});
		});
	});

	it('updates the publication start date for an existing article', function (done) {
		co(function * () {
			let insertedArticle = yield db.articlesCollection.insert({ title:'Title title', publishStart : new Date("2015-01-01"), publishEnd : new Date("2015-10-01")});
			let url = `/article/${insertedArticle._id}`;

			let updatedArticlePostData = {
				title : 'Title',
				publishStartString : "2015-02-01",
				publishEndString : "2015-12-01"
			};

			request
				.post(url)
				.send(updatedArticlePostData)
				.expect(302)
				.expect('location', `/admin${url}`)
				.end(function () {
					co(function *() {
						let article = yield db.articlesCollection.findById(insertedArticle._id);
						article.publishStart.should.equal(new Date(examplePostData.publishStartString));
					})(done());
				});
		});
	});

	it('updates the publication end date for existing article', function (done) {
		co(function * () {
			let insertedArticle = yield db.articlesCollection.insert({ title:'Title title', publishStart : new Date("2015-01-01"), publishEnd : new Date("2015-10-01")});
			let url = `/article/${insertedArticle._id}`;

			let updatedArticlePostData = {
				title : 'Title',
				publishStartString : "2015-02-01",
				publishEndString : "2015-12-01"
			};

			request
				.post(url)
				.send(updatedArticlePostData)
				.expect(302)
				.expect('location', `/admin${url}`)
				.end(function () {
					co(function *() {
						let article = yield db.articlesCollection.findById(insertedArticle._id);
						article.publishEnd.should.equal(new Date(examplePostData.publishEndString));
					})(done());
				});
		});
	});
});