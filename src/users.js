var pg = require('pg');
var bcrypt = require('bcrypt');
var db = require('./db.js');


addUser = function(name, email, phone, pass) {
	// TODO: do we really need to create new client every time?

	var client = new pg.Client(process.env.DATABASE_URL);

	query = "INSERT INTO Users (Active, Name, email, Phone, password) \
		VALUES (1, '" + 
		name + "', '" + 
		email + "', '" + 
		phone + "', '" + 
		bcrypt.hashSync( pass, 12) + 
		"'); ";

	console.log(query);

	dbAction(query, function(res) {});

};

verifyUser = function(email, pass, callback) {
        // TODO: do we really need to create new client every time?

        var client = new pg.Client(process.env.DATABASE_URL);

        query = "SELECT password FROM users  \
		WHERE email = '" + email + "';";

        console.log(query);

        dbAction(query, function(res){
		if(res.length > 0){
			bcrypt.compare(pass, res[0].password, callback);
		}
	});
};



//addUser("TestUser", "Tes@email", "phone", "pass");

/*verifyUser("Tes@email", "pass",
	function(err, res) { 
		if(err) console.log(err);
		else console.log(res);
	});
*/
