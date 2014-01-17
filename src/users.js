var pg = require('pg');
var bcrypt = require('bcrypt');
var db = require('./db.js');


// TODO make proper protedtion from SQL injection
escape = function(str){
	return str.replace("'", "No quotes please")
			.replace('"', 'No quotes please');
}

addUser = function(name, email, phone, pass) {
	// TODO: do we really need to create new client every time?

	var client = new pg.Client(process.env.DATABASE_URL);

	query = "INSERT INTO Users (Active, Name, email, Phone, password) \
		VALUES (1, '" + 
		name + "', '" + 
		email.toLowerCase() + "', '" + 
		phone + "', '" + 
		bcrypt.hashSync( pass, 12) + 
		"'); ";

	console.log(query);

	dbAction(query, function(res) {});

};

verifyUser = function(email, pass, callback) {
        // TODO: do we really need to create new client every time?

        var client = new pg.Client(process.env.DATABASE_URL);

        query = "SELECT password, id FROM users  \
		WHERE email = '" + escape(email.toLowerCase()) + "';";

        console.log(query);

        dbAction(query, function(res){
		if(res.length > 0){
			bcrypt.compare(pass, res[0].password, 
				function(err, ans) {
					callback(err, ans, res[0].id);
				});
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


//console.log("TEsddfsdtertrESFKF9384573498".toLowerCase());
