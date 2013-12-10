var express = require('express');
var fs = require('fs');
var buf = require('buffer');
var nunjucks = require('nunjucks')

var core = require('./core.js')

var app = express.createServer(express.logger());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


setInterval( resque.readFromDB, 1000);

app.get('/json-api/search', function(request, response) {
   response.send( resque.getZoneID(0, 0) );
});


app.get('/', function(request, response) {
   //response.send( fs.readFileSync('index.html').toString() );
   response.render('index.html');
});

app.get('/administration', function(request, response) {
   //response.send( fs.readFileSync('administration.html').toString() );
    response.render('administration.html');
});


var port = process.env.PORT || 8080; //5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
