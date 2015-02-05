var pg = require('pg');
var config = require('./../config.json');
var connString = config.db.connString;


function Queixinha(id, state, cat, owner, geoRef, title, description)
{
	this.id = id;
	this.state = state;
	this.description = description;
	this.owner = owner;
	this.cat = cat;
	this.geoRef = geoRef;
	this.title = title;
}

module.exports.Queixinha = Queixinha;




module.exports.getTotalNumberClosedQueixinhas = function(cb){

	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT count(*) FROM queixinha WHERE state = true",
			function(err, result)
			{
				done();
				if(err) return cb(err);

				var res = result.rows[0].count;
				cb(null, res);
			}
		);
	});
}




module.exports.getAllQueixinhasFromUser = function(id, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id WHERE q.owner=$1",
			[id],
			function(err, result)
			{
				done();
				if(err) return cb(err);

				var queixinhas = result.rows.map(function(row) {
					return new Queixinha(row.id, row.state, row.category, row.nickname, row.georef, row.title, row.description);
				});
				cb(null, queixinhas);
			}
		);
	});
}


module.exports.getAllFollowedQueixinhas = function(id, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id WHERE q.id IN (SELECT id from queixinha_dbuser WHERE dbuser=$1) AND q.state = true",
			[id],
			function(err, result)
			{
				done();
				if(err) return cb(err);

				var queixinhas = result.rows.map(function(row) {
					return new Queixinha(row.id, row.state, row.category, row.nickname, row.georef, row.title, row.description);
				});
				cb(null, queixinhas);
			}
		);
	});
}


module.exports.getQueixinhasPage = function(start, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id WHERE q.state=true AND q.id>=$1 AND q.id<$2 ORDER BY q.id",
			[start, start+5],
			function(err, result)
			{
				done();
				if(err) return cb(err);

				var queixinhas = result.rows.map(function(row) {
					return new Queixinha(row.id, row.state, row.category, row.nickname, row.georef, row.title, row.description);
				});
				cb(null, queixinhas);
			}
		);
	});
}



module.exports.getQueixinhaById = function(id, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id WHERE q.id = $1",
			[id],
			function(err, result)
			{
				done();
				if(err) return cb(err);

				var queixinha = new Queixinha(result.rows[0].id, result.rows[0].state, result.rows[0].category, 
					result.rows[0].nickname, result.rows[0].georef, result.rows[0].title, result.rows[0].description);
				cb(null, queixinha);
			}
		);
	});
}



module.exports.createQueixinha = function(queixinha, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("INSERT INTO queixinha(state, category, owner, georef, title, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
			[queixinha.state, queixinha.cat, queixinha.owner, queixinha.geoRef, queixinha.title, queixinha.description],
			function(err, result)
			{
				done();
				if(err) return cb(err);
				if(result.rowCount != 1) return cb(new Error("Error updating database..."));
				cb(null, result.rows[0]);
			}
		);
	});
}

