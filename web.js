var express = require('express');
var fs = require('fs');
var buf = require('buffer');
var core = require('./core.js')

var app = express.createServer(express.logger());

setInterval( resque.readFromDB, 1000);

app.get('/json-api/search', function(request, response) {
   response.send( resque.getZoneID(0, 0) );
});


app.get('/', function(request, response) {
   response.send( fs.readFileSync('index.html').toString() );
});

var port = process.env.PORT || 8080; //5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
