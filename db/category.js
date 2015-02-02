var pg = require('pg');
var config = require('./../config.json');
var connString = config.db.connString;

 function Category (id, name) {
	this.id = id;
	this.name = name;
}
module.exports.Category = Category;



module.exports.getAllCats = function(cb) {
	console.log("Enter");
	pg.connect(connString, function(err, client, done) {
		if(err) return cb(err);

		client.query("SELECT * FROM category",
			function(err, result)
			{
				var cat = result.rows.map(function(row) {
					console.log(row.description);
					return new Category(row.id, row.description);
				});
				cb(null, cat);
			}
		);
	});
}
