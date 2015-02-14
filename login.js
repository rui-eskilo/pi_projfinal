var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./db/user');

passport.use(new LocalStrategy(
    function(username, password, done)
    {
        User.findUser(username, function(err, user){
            if(err) return done(err);
            if(user && password === user.password) {
                user.isAuthenticated = true;
            }
            return done(null, user);
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findUserById(id, function(err, user) {
        if(err) return done(err);
        user.isAuthenticated = true;
        return done(null, user);
    });
});


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.user = req.user || new User.User();
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

