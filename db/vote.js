var pg = require('pg');
var config = require('./../config.json');
var connString = config.db.connString;



function Vote(id, value, queixinha, dbuser)
{
	this.id = id;
	this.value = value;
	this.queixinha = queixinha;
	this.dbuser = dbuser;
}

module.exports.Vote = Vote;


module.exports.isQueixinhaVotedByUser = function(queixinha, user, cb){

	pg.connect(connString, function(err, client, done){

		if(err) return cb(err);

		client.query("SELECT * FROM vote WHERE queixinha=$1 AND dbuser=$2", [queixinha, user], function(err, result){

			if(err) return cb(err);
			if(result.rowCount > 0) cb(null, true);
			else{
				cb(null, false);
			}
		});
	});
}


module.exports.getListVotesByQueixinha = function(id, cb){

	pg.connect(connString, function(err, client, done){

		if(err) return cb(err);
		client.query("SELECT * FROM vote WHERE queixinha=$1", [id], function(err, result){

			done();
			if(err) return cb(err);
			var count = result.rows.reduce(function(prev, next){
				if(next.value) prev.yes++;
				else{prev.no++;}
				return prev;
			}, {yes:0, no: 0});

			cb(null, count);
		});
	});
}


module.exports.insertVote = function(vote, cb){

	pg.connect(connString, function(err, client, done){

		if(err) return cb(err);
		client.query("insert into vote(value, queixinha, dbuser) VALUES ($1, $2, $3)", 
			[vote.value, vote.queixinha, vote.dbuser],
			 function(err, result){
				done();
				if(err) return cb(err);
				if(result.rowCount != 1) return cb(new Error("Error updating database..."));
				cb(null, result.rows[0]);
		});
	});
}