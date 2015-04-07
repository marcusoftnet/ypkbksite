"use strict";
/**
 * Module dependencies.
 */
let parse = require('co-body');
let render = require('./lib/render');

let config = require('../config')();
let db = require("./lib/db.js");
let chunks = db.chunks(config.mongoUrl);

/**
 * chunk listing.
 */
module.exports.list = function *list() {
  let chunkList = yield chunks.find({});
  this.body = yield render('list', { chunks: chunkList });
};

/**
 * Show creation form.
 */
module.exports.add = function *add() {
  this.body = yield render('new');
};

/**
 * Show chunk :id.
 */
module.exports.show = function *show(id) {
  let chunk = yield chunks.findOne({_id:id});
  if (!chunk) this.throw(404, `invalid chunk id: '${id}'`);
  this.body = yield render('show', { chunk: chunk });
};

/**
 * Create a chunk.
 */
module.exports.create = function *create() {
  let chunk = yield parse(this);
  chunk.created_at = new Date;

  yield chunks.insert(chunk);
  this.redirect('/');
};

/**
 * Show edit form
 */
module.exports.edit = function *edit(id) {
  let chunk = yield chunks.findOne({_id:id});
  this.body = yield render('edit', { chunk: chunk });
};

/**
 * Update chunk
 */
module.exports.update = function *update(id) {
  let chunk = yield parse(this);
  yield chunks.updateById(id, chunk);
  this.redirect('/chunk/' + id);
};

/**
 * Remove chunk
 */
module.exports.remove = function *remove(id) {
  yield chunks.remove({_id:id});
  this.redirect('/');
};