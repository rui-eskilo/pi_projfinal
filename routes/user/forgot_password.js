var userDB = require('./../../db/user');
var userDB = require('./../../db/user');
var express = require('express');

var request = require('request');

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
				request.post(
    				'https://mandrillapp.com/api/1.0/messages/send.json',
   					 { 
   					 	form: {
        					'key': 'nWryQ-a-tKIYoicHqHPmWw',
        					'message': {
          					'from_email': 'queixinhas100@gmail.com',
          					'to': [
              					{'email': user.email,
                				'type': 'to' }],
          					'autotext': 'true',
          					'subject': 'Recuperação de Password e Username' ,
          					'html': 'O seu Username é: ' + user.username + ' e a password: ' + user.password
        					}
      				}},
				    function (error, response, body) {
				        if (!error && response.statusCode == 200) {
				            details.state = 2;
				            return res.render('./user/forgot_password', {details : details});
				        } else {
				        	details.state = 3;
				        	return res.render('./user/forgot_password', {details : details});
				        }
				    }
				);
			}
		});
	});
}