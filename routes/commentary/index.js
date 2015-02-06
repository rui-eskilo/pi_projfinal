var commentaryDB = require('./../../db/comment');
var queixinhaDB = require('./../../db/queixinha');
var express = require('express');
var commRouter = express.Router();



commRouter.post('/new', isLoggedIn, function(req, res, next){

		var dbuser = req.body.dbuser;
		var queixinha = req.body.queixinha;
		var geo = req.body.georef;
		var description = req.body.description;

		if(!dbuser || !description || !queixinha || !geo) return res.status(400).send("Invalid data.");

		var c = new commentaryDB.Commentary(null, new Date(), queixinha, dbuser, description);
	  	commentaryDB.createCommentary(c, function(err, id)
	  	{
	  		if(err) return next(err);
	  		queixinhaDB.markQueixinhaAsDirty(queixinha, function(err, id)
	  		{
	  			if(err) return next(err);
	  			var redirect = '/queixinhas/' + queixinha;
	  			res.redirect(redirect);
	  			return res;
	  		});
	  	});
	});





module.exports = function(app){

	app.use('/commentary', commRouter)
}


////////////////////////////////////////////////////////////////////////////////////////////////

function isLoggedIn(req, res, next) {
	if(!req.user || !req.user.isAuthenticated) {
		res.redirect('/login');
	}
	next();
}