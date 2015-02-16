var queixinhaDB = require('./../db/queixinha');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

	queixinhaDB.getQueixinhas(5, function(err, allQueixinhas)
		{
			if(err) return next(err);

			console.log(allQueixinhas);

			var model = { queixinhas: allQueixinhas, title: 'Queixinhas' };
	  		res.render('index', model);
	});
});

module.exports = router;
