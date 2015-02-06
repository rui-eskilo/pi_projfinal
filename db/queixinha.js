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


function SimpleQueixinha(id, cat, geoRef, title, description)
{
	this.id = id;
	this.description = description;
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

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id WHERE q.owner=$1 ORDER BY q.id",
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

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id WHERE q.id IN (SELECT queixinha from queixinha_dbuser WHERE dbuser=$1) AND q.state = true",
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


module.exports.isQueixinhaFollowedByUser = function(idqueixinha, iduser, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT count(*) AS count from queixinha_dbuser WHERE queixinha=$1 AND dbuser=$2",
			[idqueixinha, iduser],
			function(err, result)
			{
				done();
				if(err) return cb(err);
				var res = parseInt(result.rows[0].count);
				cb(null, res>0 ? true : false);
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


module.exports.getQueixinhas = function(limit,cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT * FROM queixinha AS q WHERE q.state=true LIMIT $1",
			[limit],
			function(err, result)
			{
				done();
				if(err) return cb(err);

				var queixinhas = result.rows.map(function(row) {
					return new SimpleQueixinha(row.id, row.category, row.georef, row.title, row.description);
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


module.exports.getNotifications = function(id, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id WHERE q.id IN (SELECT queixinha FROM queixinha_dbuser WHERE dbuser=$1 AND dirty=true)",
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


module.exports.editQueixinha = function(queixinha, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("UPDATE queixinha SET category=$1, georef=$2, title=$3, description=$4 WHERE id=$5",
			[queixinha.cat, queixinha.geoRef, queixinha.title, queixinha.description, queixinha.id],
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


module.exports.followQueixinha = function(queixinha, user, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("INSERT INTO queixinha_dbuser (queixinha, dbuser, dirty) VALUES ($1, $2, false)",
			[queixinha, user],
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


module.exports.unfollowQueixinha = function(queixinha, user, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("DELETE FROM queixinha_dbuser WHERE queixinha=$1 AND dbuser=$2",
			[queixinha, user],
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

module.exports.closeQueixinha = function(queixinha, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("UPDATE queixinha SET state=false WHERE id=$1",
			[queixinha],
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

module.exports.openQueixinha = function(queixinha, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("UPDATE queixinha SET state=true WHERE id=$1",
			[queixinha],
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


module.exports.markQueixinhaAsDirty = function(id, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("UPDATE queixinha_dbuser set dirty=true WHERE queixinha=$1",
			[id],
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
