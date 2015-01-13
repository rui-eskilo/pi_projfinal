module.exports = function(app) {
	app.get('/about', function(req, res) {
  		return res.render('details/about');
	});
}
