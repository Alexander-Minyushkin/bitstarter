resque = new Object();

resque.getZoneID = function(lat, lon) {
	var tmp = {};
	tmp.id = 0;
	return JSON.stringify(tmp);
}

resque.getStatus = function(id) {
        var tmp = {};
        tmp.status = "Testing stub status";
        return JSON.stringify(tmp);
}

resque.getDescription = function(id) {
        var tmp = {};
        tmp.descr = "Testing stub description";
        return JSON.stringify(tmp);
}


resque.getImage = function (id) {
        var tmp = {};
        tmp.img = "Testing stub image";
        return JSON.stringify(tmp);
}


console.log (resque.getZoneID(0, 1))
console.log (resque.getStatus(0))
console.log (resque.getDescription(0))
console.log (resque.getImage(0))

