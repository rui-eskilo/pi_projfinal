var db = require("./../../db/queixinha");
var category = require('./../../db/category');
var express = require('express');
var queixinhasRouter = express.Router();


queixinhasRouter.get('/', function(req, res, next){

		db.getAllQueixinhas(function(err, allQueixinhas)
		{
			if(err) return next(err); // res.status(500).send("OMG! Server Error.");

			var model = { queixinhas: allQueixinhas };
	  		res.render('queixinhas/list', model );
		});

	});

queixinhasRouter.get('/:id(\\d*)', function(req, res, next){

		var id = req.params.id;
		db.getQueixinhaById(id, function(err, queixinha){
			if(err) return next(err); // res.status(500).send("OMG! Server Error.");

			var model = { queixinha: queixinha };
	  		res.render('queixinhas/single', model );
	  	});
	});


queixinhasRouter.get('/new', function(req, res, next) {
		category.getAllCats(function(err, catgs){
			if(err) return next(err);
			var model = {categories: catgs};
			console.log("model", model);
			return res.render('queixinhas/new', model);
		});
    });


queixinhasRouter.post('/new', function(req, res, next)
	{
		var title = req.body.title;

		// Não é necessário verificar a descricao uma vez que a DB tem um valor por default para a description
		var description = req.body.description;

		if(!title || !description) return res.status(400).send("Invalid data.");

		var cat = req.body.categoria;
		var geo = req.body.geoRef;

		//Falta subestituir o owner pelo user corrente !!!!!
		var q = new db.Queixinha(null, true, cat, 1, geo, title, description);
	  	db.createQueixinha(q, function(err, id)
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
	db.getById(id, function(err, queixinha) {
		if(err) return res.status(404).send("QUEIXINHA " + id + " not found!!!!.");
		req.models = req.models || {};
		req.models.queixinha = queixinha;
		next();
	});
}