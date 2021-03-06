
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , FBUser = require('./routes/FBUser')
  , homepage = require('./routes/homepage')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({appId: '206734312806434', secret: '6a3b6cf9d62b81cfc941e515f5378787'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.methodOverride());
});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
});

// GETS
app.get('/', homepage.loginLandingPage);
app.get('/login', Facebook.loginRequired(), FBUser.login);
app.get('/homepage', Facebook.loginRequired(), homepage.main);
app.get('/users', user.list);
app.get('/personalize/color', homepage.updateColor);
app.get('/users/delete_all', FBUser.delete_all);


// PUTS
app.post('/login', Facebook.loginRequired(), FBUser.login);
app.post('/logout', Facebook.loginRequired(), FBUser.logout);
app.post('/personalize/color', homepage.updateColor_post);
app.post('/personalize/quotes', homepage.updateQuotes_post);
app.post('/personalize/quotes/add', homepage.updateQuotes_post_add);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
