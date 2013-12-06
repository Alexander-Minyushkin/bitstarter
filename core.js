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

readFromDB = function() {
pg.connect(process.env.DATABASE_URL, function(err, client) {

  if(err) {
    return console.error('could not connect to postgres:', err);
  }

  var query = client.query('SELECT * FROM operation');

  query.on('row', function(row) {

    resque.operation = JSON.stringify(row);
//    console.log(resque.getZoneID(0,0));
    client.end();
  }); 
})
};

readFromDB();

setInterval( readFromDB , 1000); 
