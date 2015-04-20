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

	it('stores data for a new article in the database', function (done) {
		co(function *() {
			let examplePostData = {
				title : "Title title",
				intro : "Intro intro",
				content : "content"
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
						article.content.should.equal(examplePostData.content);
					})(done());
				});
		});
	});

	it('creates a slug for the article based on the title', function (done) {
		co(function *() {
			let examplePostData = {
				title : "Title Title Title"
			};

			// TODO: The expectation below doesn't work

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
			let insertedArticle = yield db.articlesCollection.insert({ title:'Title title'});

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
			let insertedArticle = yield db.articlesCollection.insert({ title:'Title title'});
			let url = `/article/${insertedArticle._id}`;

			let updatedArticleData = {
				title : 'Title'
			};

			request
				.post(url)
				.send(updatedArticleData)
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
});