var userDB = require('./../db/user');
var express = require('express');

module.exports = function(app) {
	app.get('/register', function(req, res, next) {
  		return res.render('register');
	});

	app.post('/register', function(req, res, next) {
  		userDB.create(req.body.username, req.body.password, req.body.nickname, req.body.email, 'UE', function(err, result){
  		if(err) return next(err);
  		return res.redirect('/login');
  		});
	});
}