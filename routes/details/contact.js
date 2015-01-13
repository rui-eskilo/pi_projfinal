module.exports = function(app) {
	app.get('/contact', function(req, res) {
		return res.render('./details/contact');
	});
}