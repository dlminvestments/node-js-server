var express = require('express');
var controller = require('controller');
 
var app = express();
var users = controller();
 
// Define handlers
users.define('secret-stuff', ['sensitive'], function(req, res) {});
users.define('edit-account', ['sensitive'], function(req, res) {});
users.define('view-account', function(req, res) {});
 
// Define middleware for all 'sensitive' grouped handlers
users.middleware('sensitive', function(req, res, next) {});
// Define middleware for all handlers on this controller
users.middleware(function(req, res, next) {});
// Define middleware for 'view-account'
users.middleware('view-account', function(req, res, next) {})
 
// Define routes
users.get('/secret-stuff/:id', 'secret-stuff');
users.put('/user/edit/:id', 'edit-account');
users.get('/user/:id', 'view-account');
users.get('/view-user/:id', 'view-account');
 
// Attach to the app
app.use(users);
