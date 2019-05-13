var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/s-users');
var artRouter = require('./routes/s-art');
var typeRouter = require('./routes/s-type');
var reviewRouter = require('./routes/s-review');

var pusersRouter = require('./routes/p-users');
var partRouter = require('./routes/p-art');
var ptypeRouter = require('./routes/p-type');
var previewRouter = require('./routes/p-review');

var app = express();

var mysql = require('mysql');
var baseDate = require('./db/config');
// var $mysql = require('./db/db');
var $sql = mysql.createConnection(baseDate.mysql);
// $sql.connect();

//解决跨域问题
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//路由---接口地址
app.use('/', indexRouter);
app.use('/system/users', usersRouter);
app.use('/system/art',artRouter);
app.use('/system/type',typeRouter);
app.use('/system/review',reviewRouter);

app.use('/users', pusersRouter);
app.use('/art',partRouter);
app.use('/type',ptypeRouter);
app.use('/review',previewRouter);

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
