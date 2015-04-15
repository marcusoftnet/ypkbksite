"use strict";
let app = require('../');
let co = require('co');

let should = require('should');
let request = require('supertest').agent(app.listen());

let monk = require('monk');
let wrap = require('co-monk');
let db = monk('localhost/koaBlog');
let chunks = wrap(db.get('chunks'));

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
	it('stores data for a new hospital in the database');
	it('updates the information about an existing hospital');
});