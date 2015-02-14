var pg = require('pg');
var config = require('./../config.json');
var connString = config.db.connString;

 function User (id, username, password, nickname, email) {
	this.id = id;
	this.username = username;
	this.password = password;
	this.nickname = nickname;
	this.email = email;
	this.isAuthenticated = false;
	this.role = 'UE';
}

module.exports.User = User;

module.exports.findUser = function(username, cb) {
	pg.connect(process.env.DATABASE_URL || connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("select * from dbuser where username=$1", [username],
			function(err, result)
			{
				done();
				if(err) return cb(err);
				if(result.rows.length === 0) {
					cb(null, null);
				} else {
					var user = new User(result.rows[0].id, result.rows[0].username, result.rows[0].password, result.rows[0].nickname, result.rows[0].email);
					cb(null, user);
				}
			}
		);
	});
}


module.exports.findUserById = function(id, cb) {
	pg.connect(process.env.DATABASE_URL || connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("seprocess.env.DATABASE_URL || lect * from dbuser where id=$1", [id],
			function(err, result)
			{
				done();
				if(err) return cb(err);
				var user = new User(result.rows[0].id, result.rows[0].username, result.rows[0].password, result.rows[0].nickname, result.rows[0].email);
				cb(null, user);
			});
	});
}

module.exports.findUserByEmail = function(email, cb) {
	pg.connect(process.env.DATABASE_URL || connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("select * from dbuser where email=$1", [email],
			function(err, result)
			{
				if(result.rows.length === 0) {
					cb(null, null);
				} else {
					var user = new User(result.rows[0].id, result.rows[0].username, result.rows[0].password, result.rows[0].nickname, result.rows[0].email);
					cb(null, user);
				}
			}
		);
	});
}


module.exports.editUser = function(user, cb){

	pg.connect(process.env.DATABASE_URL || connString, function(err, client, done) {

		if(err) return cb(err);
		client.query("UPDATE dbuser SET username=$2, password=$3, nickname=$4, email=$5 WHERE id=$1", 
			[user.id, user.username, user.password, user.nickname, user.email],
			function(err, result)
			{
				done();
				if(err) return cb(err);
				cb(null, true);

			});
	});

}


module.exports.create = function(username, password, nickname, email, role, cb){

	pg.connect(process.env.DATABASE_URL || connString, function(err, client, done) {

		if(err) return cb(err);
		client.query("INSERT INTO dbuser (username, password, nickname, email, role ) VALUES($1, $2, $3, $4, $5)",
			[username, password, nickname, email, role], 
			function(err, result)
			{
				done();
				if(err) return cb(err);
				cb(null, true);
			});
	});

}