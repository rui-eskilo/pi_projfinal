var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      done(null, { id: id, name: "Carlos Guedes" });
    });

    passport.use(new LocalStrategy(
        function(username, password, done)
        {
            return done(null, {
                id: "cguedes@gmail.com",
                name: "Carlos Guedes" });
        }
    ));

    // Configure HTTP routes

    app.get('/login', function(req, res) {
        return res.render('auth/login');
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
     }));

}