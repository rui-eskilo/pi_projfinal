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


queixinhasRouter.get('/:id', injectQueixinhaInRequest, function(req, res){
		
		res.render('queixinhas/single', { queixinha: req.models.queixinha });
	});





module.exports = queixinhasRouter;




////////////////////////////////////////////////////////////////////////////////////////////////
///
///
function injectQueixinhaInRequest(req, res, next)
{
	var id = req.params.id;
	db.getById(id, function(err, queixinha) {
		if(err) return res.status(404).send("QUEIXINHA " + id + " not found.");
		req.models = req.models || {};
		req.models.queixinha = queixinha;
		next();
	});
}