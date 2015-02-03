var voteDB = require('./../../db/vote');
var express = require('express');
var voteRouter = express.Router();




voteRouter.post('/new', function(req, res, next)
	{
		var dbuser = req.body.dbuser;
		var queixinha = req.body.queixinha;
		var vote = req.body.vote;

		if(!dbuser || !vote || !queixinha) return res.status(400).send("Invalid data.");

		

		var v = new voteDB.Vote(null, vote, queixinha, dbuser);
	  	voteDB.insertVote(v, function(err, id)
	  	{
	  		if(err) return next(err);
	  		var redirect = '/queixinhas/' + queixinha;
	  		return res.redirect(redirect);
	  	});
	});



module.exports = function(app){

	app.use('/vote', voteRouter)
}