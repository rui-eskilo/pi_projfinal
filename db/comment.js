var pg = require('pg');
var Transaction = require('pg-transaction');
var config = require('./../config.json');
var connString = config.db.connString;



function Commentary(id, insertDate, queixinhaId, dbUser, description)
{

	this.id = id;
	this.insertdate = insertDate;
	this.queixinhaid = queixinhaId;
	this.dbuser = dbUser;
	this.description = description;
}

module.exports.Commentary = Commentary;



module.exports.getAllCommentsFromQueixinha = function(id, cb)
{

	pg.connect(connString, function(err, client, done) {
		if(err) return cb(err);
		client.query("select c.id, insertion_date, queixinha, nickname, description from comentary AS c JOIN dbuser AS u ON c.dbuser = u.id where queixinha = $1", [id], 
			function(err, result)
			{
				done();
				var comms = result.rows.map(function(row) {
					return new Commentary(row.id, row.insertion_date, row.queixinha, row.nickname, row.description);
				});
				cb(null, comms);
			}
		);
	});
}


/* As it is supposed to be done
module.exports.createCommentary = function(comm, cb)
{

	var client = new pg.Client(connString);
	client.connect();
	var tx = new Transaction(client);
	tx.on('error', function(err){if(err) return cb(err);});

	tx.begin();
	tx.query('INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES($1, $2, $3, $4) RETURNING id', [comm.insertdate, comm.queixinhaid, comm.dbuser, comm.description]);
	tx.query('UPDATE queixinha_dbuser set dirty=true WHERE queixinha=$2' [comm.queixinhaid]);
	tx.commit(function(){


	});
	client.end();
}
*/


module.exports.createCommentary = function(comm, cb)
{

	pg.connect(connString, function(err, client, done) {

		if(err) return cb(err);

		client.query("INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES($1, $2, $3, $4)",
			[comm.insertdate, comm.queixinhaid, comm.dbuser, comm.description],
			function(err, result)
			{
				done();
				if(err) return cb(err);
				if(result.rowCount != 1) return cb(new Error("Error updating database..."));
				cb(null, result.rows[0]);
			});
	});
}