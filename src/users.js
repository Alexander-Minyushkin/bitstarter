var pg = require('pg');
var bcrypt = require('bcrypt');


addUser = function(name, email, phone, pass) {
// TODO: do we really need to create new client every time?

var client = new pg.Client(process.env.DATABASE_URL);

query = "INSERT INTO Users (Active, Name, email, Phone, password) \
VALUES (1, '" + 
name + "', '" + 
email + "', '" + 
phone + "', '" + 
bcrypt.hashSync( pass, bcrypt.genSaltSync(12)) + 
"'); ";

console.log(query);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres: ', err);
  }
  client.query(query, 
    function(err, result) {
     if(err) {
      return console.error('error running query: ', err);
     }

     //result.rows;
     //console.log(resque.getZoneID(0,0));
     client.end();
    });
});


};


//addUser("TestUser", "Tes@email", "phone", "pass");
