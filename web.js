var express = require('express');
var fs = require('fs');
var buf = require('buffer');
var nunjucks = require('nunjucks')

var core = require('./src/core.js')
var users = require('./src/users.js');

var app = express.createServer()

simplyLogError = function(err){if(err) console.log(err);}

app.configure(function(){
	// Authentication support
	// http://habrahabr.ru/post/145970/
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ 
			secret: process.env.SECRET, 
			cookie: { maxAge: 60000,
				  authorized: false }} 
		));
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
   res.render('index.html');
   req.session.reload(simplyLogError);
   console.log(req.session);
   req.session.save(simplyLogError);
});

app.get('/administration', function(req, res) {
    res.render('administration.html');
});


app.post('/userlogin', function(req, res){

console.log("userlogin:" + req.body);
	var email = req.body.email;
	var password = req.body.password;
	req.session.cookie.authorized = verifyUser(email, password);
	req.session.save(function(err){if(err) console.log(err);});


	res.render('administration.html');
});



//The 404 Route (ALWAYS Keep this as the last route)
// http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
app.get('*', function(req, res){
  res.status(404);
  res.render('404.html');
});

var port = process.env.PORT || 8080; //5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
