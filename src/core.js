var pg = require('pg');
var db = require('./db.js');

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

resque.readFromDB = function() {
	dbAction('SELECT * FROM operation  WHERE status=1',
		function(res) { resque.operation = res});
}

resque.readFromDB();

console.log( resque.operation.length);
