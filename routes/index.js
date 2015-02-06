var queixinhaDB = require('./../db/queixinha');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	queixinhaDB.getQueixinhas(5, function(err, allQueixinhas)
		{
			if(err) return next(err); // res.status(500).send("OMG! Server Error.");

			console.log(allQueixinhas);

			var model = { queixinhas: allQueixinhas, title: 'Queixinhas' };
	  		res.render('index', model);
	});
});

module.exports = router;
