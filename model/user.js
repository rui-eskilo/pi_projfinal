var pg = require('pg');
var config = require('./../config.json');
var connString = config.db.connString;

 function User (id, username, password, nickname, email) {
	this.id = id;
	this.username = username;
	this.password = password;
	this.nickname = nickname;
	this.email = email;
}

module.exports.findUser = function(username, cb) {
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("select * from utilizador where username=$1", [username],
			function(err, result)
			{
				if(err) return cb(err);
				var u = new User(1,'user','pass', 'nick', 'mail');
				var user = new User(result.rows[0].id, result.rows[0].username, result.rows[0].password, result.rows[0].alcunha, result.rows[0].email);
				cb(null, user);
			}
		);
	});
}