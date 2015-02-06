var userDB = require('./../../db/user');
var express = require('express');

module.exports = function(app) {
	var state = 0;
	app.get('/forgot_password', function(req, res, next) {
		return res.render('./user/forgot_password', {state : state});
	});

	app.post('/forgot_password', function(req, res, next) {

		userDB.findUserByEmail(req.body.email, function(err, user) {
			if(err) return next(err);
			if(!user) {
				state = 1;
				return res.render('./user/forgot_password', {state : state});
			} else {
				state = 2;
				return res.render('./user/forgot_password', {state : state});
			}
		});
	});
}