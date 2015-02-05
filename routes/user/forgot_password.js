module.exports = function(app) {
	app.get('/forgot_password', function(req, res) {
		return res.render('./user/forgot_password');
	});
}