var queixinhaDB = require('./../../db/queixinha');
var categoryDB = require('./../../db/category');
var commentaryDB = require('./../../db/comment');
var voteDB = require('./../../db/vote');
var express = require('express');
var queixinhasRouter = express.Router();
var passport = require('passport');
global.mycountPages = 0;


queixinhasRouter.get('/', isLoggedIn, function(req, res, next){

		var page = parseInt(req.query.page);

		if(!page){ 

			queixinhaDB.getTotalNumberOpenQueixinhas(function(err, total){

				if(err) return next(err);
				global.mycount = parseInt(total);
				queixinhaDB.getQueixinhasPage(1, function(err, allQueixinhas)
				{
					if(err) return next(err);
					global.mycountPages = Math.ceil(total/5);
					var model = { queixinhas: allQueixinhas, page: 1, countPages: global.mycountPages };
		  			res.render('queixinhas/list', model );
		  		});
			});
		}
		else{
			queixinhaDB.getQueixinhasPage(page, function(err, allQueixinhas)
			{
				if(err) return next(err); // res.status(500).send("OMG! Server Error.");

				var model = { queixinhas: allQueixinhas, page: page, countPages: global.mycountPages };
	  			res.render('queixinhas/list', model );
		});
	}
});

		

queixinhasRouter.get('/:id(\\d*)', isLoggedIn, function(req, res, next){

		var id = req.params.id;
		var user = req.user;
		var model = {};

		// Mudar para a framework Async !!!!!
		queixinhaDB.getQueixinhaById(id, function(err, queixinha){
			if(err) return next(err);
			model.queixinha = queixinha;
			commentaryDB.getAllCommentsFromQueixinha(id, function(err, comments){
				if(err) return next(err);
				model.comments = comments;
				voteDB.getListVotesByQueixinha(id, function(err, votes){
					if(err) return next(err);
					model.votes = votes;
					voteDB.isQueixinhaVotedByUser(id, user.id, function(err, bool){
						if(err) return next(err);
						model.isVoted = bool;
						queixinhaDB.isQueixinhaFollowedByUser(id, user.id, function(err, bool){
							if(err) return next(err);
							model.isFollowed = bool;
							queixinhaDB.unmarkQueixinhaAsDirty(id, user.id, function(err, bool){
								if(err) return next(err);
								res.render('queixinhas/single', model);
							});
						});
					});
				});
			});
		});
	});


queixinhasRouter.get('/new', isLoggedIn, function(req, res, next) {
		categoryDB.getAllCats(function(err, catgs){
			if(err) return next(err);
			var model = {categories: catgs};
			return res.render('queixinhas/new', model);
		});
    });



queixinhasRouter.get('/edit', isLoggedIn, function(req, res, next){

		var q = parseInt(req.query.queixinha);
		var model = {};
		queixinhaDB.getQueixinhaById(q, function(err, result){

				if(err) return next(err);
				model.queixinha = result
				categoryDB.getAllCats(function(err, catgs){

					if(err) return next(err);
					model.categories = catgs
					res.render('dashboard/editQueixinha', model );
				});
			});	
	});



queixinhasRouter.post('/new', isLoggedIn, function(req, res, next)
	{
		var title = req.body.title;
		var description = req.body.description;

		if(!title || !description) return res.status(400).send("Invalid data.");

		var cat = req.body.categoria;
		var geo = req.body.geoRef;

		var q = new queixinhaDB.Queixinha(null, true, cat, req.user.id, geo, title, description);
	  	queixinhaDB.createQueixinha(q, function(err, id)
	  	{
	  		if(err) return next(err);
	  		var redirect = '/queixinhas/' + id.id;
	  		return res.redirect(redirect);
	  	});
	});



queixinhasRouter.post('/edit', isLoggedIn, function(req, res, next)
	{
		var id = req.body.id;
		var title = req.body.title;
		var description = req.body.description;

		if(!title || !description || !id) return res.status(400).send("Invalid data.");

		var cat = req.body.categoria;
		var geo = req.body.geoRef;

		var q = new queixinhaDB.Queixinha(id, true, cat, req.user.id, geo, title, description);
	  	queixinhaDB.editQueixinha(q, function(err, value)
	  	{
	  		if(err) return next(err);
	  		var comm = new commentaryDB.Commentary(null, new Date(), id, req.user.id, 'Esta queixinha foi alterada pelo seu criador');
	  		commentaryDB.createCommentary(comm, function(err, id){
	  			if(err) return next(err);
	  			var redirect = '/dashboard/myqueixinhas';
	  			return res.redirect(redirect);
	  		});
	  		
	  	});
	});



queixinhasRouter.post('/follow', isLoggedIn, function(req, res, next){

	var dbuser = req.user.id;
	var queixinha = req.body.queixinha;

	if(!dbuser || !queixinha) return res.status(400).send("Invalid data.");
	queixinhaDB.followQueixinha(queixinha, dbuser, function(err, id)
	  	{
	  		if(err) return next(err);
	  		var redirect = '/queixinhas/' + queixinha;
	  		return res.redirect(redirect);
	  	});
});



queixinhasRouter.post('/unfollow', isLoggedIn, function(req, res, next){

	var dbuser = req.user.id;
	var queixinha = parseInt(req.body.queixinha);

	if(!dbuser || !queixinha) return res.status(400).send("Invalid data.");
	queixinhaDB.unfollowQueixinha(queixinha, dbuser, function(err, id)
	  	{
	  		if(err) return next(err);
	  		var redirect = '/dashboard/followed';
	  		return res.redirect(redirect);
	  	});
});


queixinhasRouter.post('/lock', isLoggedIn, function(req, res, next){

	var dbuser = req.user.id;
	var queixinha = parseInt(req.body.queixinha);

	if(!dbuser || !queixinha) return res.status(400).send("Invalid data.");
	queixinhaDB.closeQueixinha(queixinha, dbuser, function(err, id)
	  	{
	  		if(err) return next(err);
	  		var redirect = '/dashboard/myqueixinhas';
	  		return res.redirect(redirect);
	  	});
});


queixinhasRouter.post('/unlock', isLoggedIn, function(req, res, next){

	var dbuser = req.user.id;
	var queixinha = parseInt(req.body.queixinha);

	if(!dbuser || !queixinha) return res.status(400).send("Invalid data.");
	queixinhaDB.openQueixinha(queixinha, dbuser, function(err, id)
	  	{
	  		if(err) return next(err);
	  		var redirect = '/dashboard/myqueixinhas';
	  		return res.redirect(redirect);
	  	});
});




module.exports = function(app){

	app.use('/queixinhas', queixinhasRouter)
}




////////////////////////////////////////////////////////////////////////////////////////////////
///
///
function injectQueixinhaInRequest(req, res, next)
{
	var id = req.params.id;
	queixinhaDB.getById(id, function(err, queixinha) {
		if(err) return res.status(404).send("QUEIXINHA " + id + " not found!!!!.");
		req.models = req.models || {};
		req.models.queixinha = queixinha;
		next();
	});
}

function isLoggedIn(req, res, next) {
	if(req.user && req.user.isAuthenticated) {
		return next();
	}
	res.redirect('/login');
}
