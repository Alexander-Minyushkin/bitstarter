var express = require('express');
var fs = require('fs');
var buf = require('buffer');
var nunjucks = require('nunjucks')

var core = require('./core.js')

var app = express.createServer()

app.configure(function(){
	// Authentication support
	// http://habrahabr.ru/post/145970/
	app.use(express.cookieParser());
	app.use(express.session({ secret: process.env.SECRET} ));
	express.logger();
});

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


setInterval( resque.readFromDB, 1000);

app.get('/json-api/search', function(request, response) {
   response.send( resque.getZoneID(0, 0) );
});


app.get('/', function(req, res) {
   //response.send( fs.readFileSync('index.html').toString() );
   res.render('index.html');
   console.log(req.session);
});

app.get('/administration', function(request, response) {
   //response.send( fs.readFileSync('administration.html').toString() );
    response.render('administration.html');
});



//The 404 Route (ALWAYS Keep this as the last route)
// http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
app.get('*', function(req, res){
  res.send("Error 404. We don't have this page.", 404);
});

var port = process.env.PORT || 8080; //5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
