var queixinhaDB = require('./../../db/queixinha');
var userDB = require('./../../db/user');
var voteDB = require('./../../db/vote');
var express = require('express');
var dashboardRouter = express.Router();




dashboardRouter.get('/', isLoggedIn, function(req, res, next){

	var model = {user: req.user};
	res.render('dashboard/initial', model);
});



dashboardRouter.get('/myqueixinhas', isLoggedIn, function(req, res, next){

	var model = {user: req.user};
	queixinhaDB.getAllQueixinhasFromUser(req.user.id, function(err, queixinhas){

		if(err) return next(err);
		model.myqueixinhas = queixinhas;
		res.render('dashboard/myqueixinhas', model);
	});
});



dashboardRouter.get('/followed', isLoggedIn, function(req, res, next){

	var model = {user: req.user};
	queixinhaDB.getAllFollowedQueixinhas(req.user.id, function(err, queixinhas){

		if(err) return next(err);
		model.queixinhas = queixinhas;
		res.render('dashboard/followed', model);

		});
});


dashboardRouter.get('/notifications', isLoggedIn, function(req, res, next){

	var model = {user: req.user};
	queixinhaDB.getNotifications(req.user.id, function(err, queixinhas){

		if(err) return next(err);
		model.queixinhas = queixinhas;
		res.render('dashboard/notifications', model);

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
