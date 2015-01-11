var pg = require('pg');
var config = require('./../config.json');
var connString = config.db.connString;


function Queixinha(id, estado, categoria, criador, geo, descricao)
{
	this.id = id;
	this.state = estado;
	this.description = descricao;
	this.owner = criador;
	this.cat = categoria;
	this.geoRef = geo;
}



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