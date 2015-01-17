var category = require('./../../model/category');

module.exports = function(app) {
	app.get('/queixinhas/new', function(req, res, next) {
		console.log("Queixinha new");
		category.getAll(function(err, catgs){
			if(err) return next(err);
			var model = {categories: catgs};
			console.log("model", model);
			return res.render('queixinhas/new', model);
		});
    });
}