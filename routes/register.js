module.exports = function(app) {
	app.get('/register', function(req, res) {
  		return res.render('register');
	});
}