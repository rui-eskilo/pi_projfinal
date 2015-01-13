var db = require("./../../model");
var express = require('express');
var queixinhasRouter = express.Router();


queixinhasRouter.get('/', function(req, res, next){

		db.allQueixinhas(function(err, allQueixinhas)
		{
			if(err) return next(err); // res.status(500).send("OMG! Server Error.");

			var model = { queixinhas: allQueixinhas };
	  		res.render('queixinhas/list', model );
		});

	});


queixinhasRouter.get('/queixinha/:id', injectQueixinhaInRequest, function(req, res){
		
		res.render('queixinhas/single', { queixinha: req.models.queixinha });
	});


queixinhasRouter.get('/new', function(req, res)
	{
		//var q = new db.Queixinha();
	  	res.render('queixinhas/new', {queixinha : {}});
	});



queixinhasRouter.post('/new', function(req, res, next)
	{
		var title = req.body.title;
		var description = req.body.description;

		if(!title || !description) return res.status(400).send("Invalid data.");

		var q = new db.Queixinha(null, true, 1, 1, "Lisboa", description);
	  	db.create(q, function(err)
	  	{
	  		if(err) return next(err);

	  		return res.redirect('/queixinhas/queixinha/' + q.id);
	  	});
	});



module.exports = queixinhasRouter;




////////////////////////////////////////////////////////////////////////////////////////////////
///
///
function injectQueixinhaInRequest(req, res, next)
{
	var id = req.params.id;
	db.getById(id, function(err, queixinha) {
		if(err) return res.status(404).send("QUEIXINHA " + id + " not found!!!!.");
		req.models = req.models || {};
		req.models.queixinha = queixinha;
		next();
	});
}