"use strict";
let app = require('../');
let co = require('co');

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
				res.text.should.containEql("<button>Buat berita baru</button>")
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
	it('has a list of hospitals');
	it('has a list of clinics');
	it('has a list of news');
	it('has a list of texts');
});