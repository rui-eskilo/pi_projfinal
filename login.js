var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/user');

module.exports = function(app) {
    passport.deserializeUser(function(id, done) {
        done(null, { id: id, name: "Carlos Guedes" });
    });

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

    // Configure HTTP routes

    app.get('/login', function(req, res, next) {
        return res.render('login');
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
     }));

}