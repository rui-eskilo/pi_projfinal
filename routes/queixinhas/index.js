var queixinhaDB = require('./../../db/queixinha');
var categoryDB = require('./../../db/category');
var commentaryDB = require('./../../db/comment');
var voteDB = require('./../../db/vote');
var express = require('express');
var queixinhasRouter = express.Router();
var passport = require('passport');
global.mycount = 0;


queixinhasRouter.get('/', isLoggedIn, function(req, res, next){

		var start = parseInt(req.query.start);

		if(!start){ 

			queixinhaDB.getTotalNumberClosedQueixinhas(function(err, total){

				if(err) return next(err);
				var tmp = parseInt(total);
				global.mycount = tmp;
				queixinhaDB.getQueixinhasPage(1, function(err, allQueixinhas)
				{
					if(err) return next(err); // res.status(500).send("OMG! Server Error.");
					var model = { queixinhas: allQueixinhas, start: 1, count: global.mycount };
		  			res.render('queixinhas/list', model );
		  		});
			});
		}
		else{
			queixinhaDB.getQueixinhasPage(start, function(err, allQueixinhas)
			{
				if(err) return next(err); // res.status(500).send("OMG! Server Error.");

				var model = { queixinhas: allQueixinhas, start: start, count: global.mycount };
	  			res.render('queixinhas/list', model );
		});
	}
});

		

queixinhasRouter.get('/:id(\\d*)', isLoggedIn, function(req, res, next){

		var id = req.params.id;
		var user = req.user;
		var model = {};

		// Mudar para Async !!!!!
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
						res.render('queixinhas/single', model);
					});
					
				});
			});
		});
	});


queixinhasRouter.get('/new', isLoggedIn, function(req, res, next) {
		categoryDB.getAllCats(function(err, catgs){
			if(err) return next(err);
			var model = {categories: catgs};
			console.log("model", model);
			return res.render('queixinhas/new', model);
		});
    });


queixinhasRouter.post('/new', isLoggedIn, function(req, res, next)
	{
		var title = req.body.title;

		// Não é necessário verificar a descricao uma vez que a DB tem um valor por default para a description
		var description = req.body.description;

		if(!title || !description) return res.status(400).send("Invalid data.");

		var cat = req.body.categoria;
		var geo = req.body.geoRef;

		//Falta subestituir o owner pelo user corrente !!!!!
		var q = new queixinhaDB.Queixinha(null, true, cat, 1, geo, title, description);
	  	queixinhaDB.createQueixinha(q, function(err, id)
	  	{
	  		if(err) return next(err);
	  		var redirect = '/queixinhas/' + id.id;
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