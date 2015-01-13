var pg = require('pg');
var config = require('./../config.json');
var connString = config.db.connString;


function Queixinha(id, state, cat, owner, geoRef, description)
{
	this.id = id;
	this.state = state;
	this.description = description;
	this.owner = owner;
	this.cat = cat;
	this.geoRef = geoRef;
}

module.exports.Queixinha = Queixinha;



module.exports.allQueixinhas = function(cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT * FROM queixinha JOIN utilizador ON queixinha.criador=utilizador.id ",
			function(err, result)
			{
				if(err) return cb(err);

				var queixinhas = result.rows.map(function(row) {
					return new Queixinha(row.id, row.estado, row.categoria, row.alcunha, row.georeferencia, row.descricao);
				});
				cb(null, queixinhas);
			}
		);
	});

}



module.exports.getById = function(id, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("SELECT q.id, estado, c.descricao AS categoria, alcunha, georeferencia, q.descricao FROM queixinha AS q JOIN utilizador AS u ON q.criador=u.id JOIN categoria AS c ON q.categoria=c.id WHERE q.id = $1",
			[id],
			function(err, result)
			{
				if(err) return cb(err);

				var queixinha = new Queixinha(result.rows[0].id, result.rows[0].estado, result.rows[0].categoria, 
					result.rows[0].alcunha, result.rows[0].georeferencia, result.rows[0].descricao);
				cb(null, queixinha);
			}
		);
	});
}


module.exports.create = function(queixinha, cb)
{
	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("INSERT INTO queixinha(estado, categoria, criador, georeferencia, descricao) VALUES($1, $2, $3, $4, $5)",
			[queixinha.state, queixinha.cat, queixinha.owner, queixinha.geoRef, queixinha.description],
			function(err, result)
			{
				if(err) return cb(err);
				if(result.rowCount != 1) return cb(new Error("Error updating database..."));
				cb(null);
			}
		);
	});
}