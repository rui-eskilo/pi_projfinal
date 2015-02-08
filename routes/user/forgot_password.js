var userDB = require('./../../db/user');
var userDB = require('./../../db/user');
var express = require('express');

module.exports = function(app) {
	var details = {};
	details.state = 0;
	app.get('/forgot_password', function(req, res, next) {
		return res.render('./user/forgot_password', {details : details});
	});

	app.post('/forgot_password', function(req, res, next) {

		

		userDB.findUserByEmail(req.body.email, function(err, user) {
			if(err) return next(err);
			if(!user) {
				details.state = 1;
				return res.render('./user/forgot_password', {details : details});
			} else {
				details.state = 2;
				console.log(user);
				details.username = user.username;
				details.password = user.password;
				return res.render('./user/forgot_password', {details : details});
			}
		});
	});
}