var express = require('express');
var fs = require('fs');
var buf = require('buffer');
var nunjucks = require('nunjucks');

var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);



var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);


var connect = require('connect');
var RedisStore = require('connect-redis')(express);

var core = require('./src/core.js');
var users = require('./src/users.js');
var zones = require('./src/zones.js');

var app = express.createServer();
//var app = express();

simplyLogError = function(err){if(err) console.log(err);}


                            
// Authentication support
// http://habrahabr.ru/post/145970/
        
app.use(express.cookieParser())
.use(express.session({ 
	store: new RedisStore({
	host: redisURL.host.split(":")[0],
	port: redisURL.port,
	pass: redisURL.auth.split(":")[1],
	db: redisURL.auth.split(":")[0]
	}),
	secret: process.env.SECRET,
	proxy: true, 
	cookie: { maxAge: 60*60*1000 }} 
	))
.use(express.bodyParser());
express.logger();


nunjucks.configure('views', {
    autoescape: true,
    express: app
});


setInterval( resque.readFromDB, 1000);

app.get('/json-api/search', function(request, response) {
   response.send( resque.getZoneID(0, 0) );
});


app.get('/', function(req, res) {
      
//   console.log(req.session);
   req.session.save(simplyLogError);

   res.render('index.html');
});

app.get('/administration', function(req, res) {

//console.log( url.parse(req.url, true).query );

	var id = url.parse(req.url, true).query.id;
	var currentZone = null;
	var activeZones = resque.getZoneID();


	if ( id != null ){
		var fZone = activeZones.filter(
			function(z) {return z.id == id;});

		if (fZone.length>0)
			currentZone = fZone[0];
	}
	
    res.render('administration.html',
       {email : req.session.email,
        auth : req.session.authorized,
	zones: activeZones,
	displayID: id,
	z: currentZone
       });
});

app.post('/userlogout', function(req, res){
	req.session.destroy();
	res.render('index.html');
});

app.post('/userlogin', function(req, res){

//	console.log( req.body);

	var email = req.body.email;
	var password = req.body.password;
	verifyUser(email, password, 
	function(err, answer, authorId){
		if(err) { 
			console.log(err);
			req.session.authorized = false;
			}
		else {
			req.session.authorized = answer;
			req.session.email = email;
			req.session.authorId = authorId;
			}

		req.session.save(simplyLogError);
		console.log(req.session);
		res.render('administration.html', 
				{email: req.session.email,
				 auth: req.session.authorized,
				 zones: resque.getZoneID()
				});
	});
});

app.post('/save_zone', function(req, res){
//console.log(req.body);

updateZone(	req.body, 
		function(x) {
			res.redirect('administration?id=' + req.body.id);
		});
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
