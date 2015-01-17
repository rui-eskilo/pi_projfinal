module.exports = function(app) {
	app.get('/dashboard', function(req, res) {
  		return res.render('dashboard');
	});
}