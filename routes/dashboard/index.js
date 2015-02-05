var queixinhaDB = require('./../../db/queixinha');
var userDB = require('./../../db/user');
var voteDB = require('./../../db/vote');
var express = require('express');
var dashboardRouter = express.Router();




dashboardRouter.get('/', isLoggedIn, function(req, res, next){


	userDB.findUserById(req.user.id, function(err, user){

		if(err) return next(err);
		var model = { user: user };
		res.render('dashboard/initial', model);


	});
});








module.exports = function(app){

	app.use('/dashboard', dashboardRouter)
}



////////////////////////////////////////////////////////////////////////////////////////////////
///
///

function isLoggedIn(req, res, next) {
	if(req.user && req.user.isAuthenticated) {
		return next();
	}
	res.redirect('/login');
}
