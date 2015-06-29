var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//load config file
var config = require('./libs/config');
//use log4js for the log
var log4js = require('log4js');
//load the log configuration
log4js.configure('./libs/log4js_configuration.json');
var logger = log4js.getLogger();

var toobusy = require('toobusy');

var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//set the runtime environment
app.set('env',config.env);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//use jwt to protect api
app.use('/app', expressJwt({secret: config.jwtsecret}));
//set the log level
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next){
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).json('{message:Unauthorized}');
    }
});

//cross domain settings
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', config.crossdomain);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    if(toobusy()){
        console.log('BUSY');
        res.status(503).send("Mynodejs is stuck!!");
    }
    else{
        next();
    }

});


app.use('/', routes);
app.use('/users', users);


//load wechat test api
require('./routes')(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    logger.error(err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  logger.error(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;



//todo: test the forever function
//todo: much more famaliar with mongoDB