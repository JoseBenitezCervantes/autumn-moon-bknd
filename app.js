var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userslistRouter = require('./routes/usrlist');
var clientsRouter = require('./routes/clients');
var uplUsrrouter = require('./routes/uploadUsr');
var rmUsrRounter = require('./routes/rmUsr');
var guiasRouter = require('./routes/guias');
var valid = require('./routes/valid');
const fileUpload = require('express-fileupload');

var app = express();
var uri = "mongodb+srv://root:S4kur4-007@testcluster-fkm78.gcp.mongodb.net/Heza?retryWrites=true&w=majority";
// view engine setup
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/' 
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userslist', userslistRouter);
app.use('/clients', clientsRouter);
app.use('/upUsr', uplUsrrouter);
app.use('/rmUsr', rmUsrRounter);
app.use('/valid', valid);
app.use('/guides', guiasRouter);
mongoose.connect(uri);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
