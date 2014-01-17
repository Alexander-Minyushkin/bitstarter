var db = require('./db.js');
var core = require('./core.js');


updateZone = function(z, callback){

//console.log(z.descr);
	dbAction("UPDATE Operation SET " + 
		" name='" + z.name + 
		"', Phone = '" + z.phone +
		"', Descr = '" + z.descr +
		"', Img = '" + z.img +
		"' WHERE id = " + z.id +";",
		function(x) { 
			resque.readFromDB(callback); 			
		});
};


newZone = function(z, callback){

//console.log(z.descr);
        dbAction("BEGIN; \
		INSERT INTO Operation \
		(status, authorId, name, lon_min, lon_max, \
		lat_min, lat_max, Descr) \
		VALUES (1, 1, 'Please provide name', 0, 180, \
		0, 90, 'Please describe operation'); \
\
		SELECT MAX(id) FROM Operation WHERE \
		authorId =  " + z.authorId + 
		"; COMMIT;",
                function(x) {
                        resque.readFromDB(callback(x));
                });
};

