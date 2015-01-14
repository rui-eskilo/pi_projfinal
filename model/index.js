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



module.exports.allQueixinhas = function(cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id",
			function(err, result)
			{
				if(err) return cb(err);

				var queixinhas = result.rows.map(function(row) {
					return new Queixinha(row.id, row.state, row.category, row.nickname, row.georef, row.title, row.descripcion);
				});
				cb(null, queixinhas);
			}
		);
		done();
	});

}



module.exports.getById = function(id, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT q.id AS id, state, c.description AS category, nickname, georef, title, q.description FROM queixinha AS q JOIN dbuser AS u ON q.owner=u.id JOIN category AS c ON q.category=c.id WHERE q.id = $1",
			[id],
			function(err, result)
			{
				if(err) return cb(err);

				var queixinha = new Queixinha(result.rows[0].id, result.rows[0].state, result.rows[0].category, 
					result.rows[0].nickname, result.rows[0].georef, result.rows[0].title, result.rows[0].descripcion);
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
				if(err) return cb(err);
				if(result.rowCount != 1) return cb(new Error("Error updating database..."));
				cb(null, result.rows[0]);
			}
		);
	});
}