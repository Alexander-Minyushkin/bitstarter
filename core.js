var pg = require('pg');

resque = new Object();

resque.operation = new Object();

resque.getZoneID = function(lat, lon) {
	var tmp = {};
	tmp.id = 0;
/*	if (this.operation.isEmpty()) {
		console.log("Zero lengh");

		return JSON.stringify(tmp);
	}
*/
	return this.operation;
	
}


//console.log (resque.getZoneID(0, 1).toString())


// Read info about current operations from DB

//console.log(process.env.DATABASE_URL);

resque.readFromDB = function() {
// TODO: do we really need to create new client every time?

var client = new pg.Client(process.env.DATABASE_URL);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres: ', err);
  }
  client.query('SELECT * FROM operation', function(err, result) {
    if(err) {
      return console.error('error running query: ', err);
    }
    resque.operation = result.rows;
    //console.log(resque.getZoneID(0,0));
    client.end();
  });
});


};

resque.readFromDB();
