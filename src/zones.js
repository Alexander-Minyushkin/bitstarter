var db = require('./db.js');
var core = require('./core.js');


updateZone = function(z, callback){

//console.log(z.descr);
	dbAction("UPDATE Operation SET " + 
		" name='" + escape(z.name) + 
		"', Phone = '" + escape(z.phone) +
		"', Descr = '" + escape(z.descr) +
		"', Img = '" + escape(z.img) +
		"' WHERE id = " + escape(z.id) +";",
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
		VALUES (1, " + z.authorId + ", 'Please provide name', 0, 180, \
		0, 90, 'Please describe operation'); \
\
		SELECT MAX(id) FROM Operation WHERE \
		authorId =  " + z.authorId + 
		"; COMMIT;",
                function(x) {
                        resque.readFromDB(callback(x));
                });
};

