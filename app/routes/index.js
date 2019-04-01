const getRoutes = require('./comment-get-route');
const postRoutes = require('./comment-post-route');
const putRoutes = require('./comment-put-route');
const deleteRoutes = require('./comment-delete-route');
const loadDatabase = require('../data/setup-database');

module.exports = function (app, db) {

  // create database in case it was not created yet,
  // or update in case of migrations
  loadDatabase(db);

  // start routes
  getRoutes(app, db);
  postRoutes(app, db);
  putRoutes(app, db);
  deleteRoutes(app, db);

};
