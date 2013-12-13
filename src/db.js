var pg = require('pg');


dbAction = function(query, callback) {
// TODO: do we really need to create new client every time?

var client = new pg.Client(process.env.DATABASE_URL);
client.connect(function(err) {
  if(err) {
    client.end();
    return console.error('could not connect to postgres: ', err);
  }
  client.query( query,
    function(err, result) {
     if(err) {
      client.end();
      return console.error('error running query: ', err);
     }
     callback(result.rows);

     client.end();
    });
});
}


//dbAction('SELECT * FROM operation', function(res) { console.log(res)});
