var userDB = require('./../db/user');
var express = require('express');
var bcrypt = require('bcrypt-nodejs');


module.exports = function(app) {

	app.get('/register', function(req, res, next) {
  		return res.render('register');
	});

	app.post('/register', function(req, res, next) {
		var hash = bcrypt.hashSync(req.body.password);
  		userDB.create(req.body.username, hash, req.body.nickname, req.body.email, 'UE', function(err, result){
  			if(err) return next(err);
  			return res.redirect('/login');
  		});
	});
}