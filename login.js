var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/user');

passport.use(new LocalStrategy(
    function(username, password, done)
    {
        console.log('Begin Authenticate');
        User.findUser(username, function(err, user){
            if(err) return done(err);
            return done(null, user);
        })
    }
));

passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("deserializeUser");
    User.findById(id, function(err, user) {
        if(err) return done(err);
        user.isAuthenticated = true;
        return done(null, user);
    });
});


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.locals.user = req.user || new User.User();
      console.log(req.user);
      next();
    });

    app.get('/login', function(req, res, next) {
        return res.render('login');
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
     }));

    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });

}