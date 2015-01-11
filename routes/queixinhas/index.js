var db = require("./../../model");
var express = require('express');
var queixinhasRouter = express.Router();


queixinhasRouter.get('/', function(req, res, next){

		db.allQueixinhas(function(err, allQueixinhas)
		{
			if(err) return next(err); // res.status(500).send("OMG! Server Error.");

			var model = { queixinhas: allQueixinhas };
//			res.send(model);
	  		res.render('queixinhas/list', model );
		});

	});


module.exports = queixinhasRouter;




////////////////////////////////////////////////////////////////////////////////////////////////
///
///
function injectTodoInRequest(req, res, next)
{
	var id = req.params.id;
	db.getById(id, function(err, todo) {
		if(err) return res.status(404).send("TODO " + id + " not found.");
		req.models = req.models || {};
		req.models.todo = todo;
		next();
	});
};