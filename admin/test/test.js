"use strict";
let app = require('../');
let co = require('co');

let should = require('should');
let request = require('supertest').agent(app.listen());

let monk = require('monk');
let wrap = require('co-monk');
let db = monk('localhost/koaBlog');
let chunks = wrap(db.get('chunks'));


describe('Admin functions for ypkbk site:', function(){
	let removeAll = function(done){
		co(function *(){
			yield chunks.remove({});
		})(done);
	};

	beforeEach(function (done) {
		removeAll(done);
	});

	afterEach(function (done) {
		removeAll(done);
	});

	let test_chunk  = { title: 'A nice title', body : 'Short body. Yeah!'};


	it('can create a new chunk with all the required fields', function(done){
		request
			.post('/post')
			.send(test_chunk)
			.expect(302)
			.expect('location', '/')
			.end(done);
	});

	it('renders view page for existing post', function(done){
		co(function *(){
			let post = yield chunks.insert(test_chunk);
			request
				.get('/post/' + post._id)
				.expect('Content-Type', /text/)
	      		.expect(200);
	    })(done);
	});

	it('renders view page for a number of chunks', function(done){
		co(function *(){
			yield chunks.insert(test_chunk)
			yield chunks.insert({ title: 'Another title', body : 'Short body. Yeah!'})
			yield chunks.insert({ title: 'Yet another title', body : 'Short body. Yeah!'})

			request
				.get('/')
				.expect('Content-Type', /text/)
	      		.expect(200);
	    })(done);
	});

	it('updates an existing post', function(done){
		co(function *(){
			let post = yield chunks.insert(test_chunk);
			let postUrl = '/post/' + post._id;
			request
				.post(postUrl)
				.send({title: 'Updated title', body: 'Updated body'})
				.expect(302)
				.expect('location', postUrl);
	    })(done);
	});

	it('deletes an existing post', function(done){
		co(function *(){
			let post = yield chunks.insert(test_chunk);
			let id = post._id;
			let deleteUrl = '/post/' + id + '/delete';
			request
				.get(deleteUrl)
				.expect(302)
				.expect('location', '/');
	    })(done);
	});
});