let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');

let app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//banco de dados
const dbConnection = require('./config/database')();

//rotas da API
let usersRouter = require('./routes/users');
app.use('/users', usersRouter);

let loginRouter = require('./routes/login');
app.use('/', loginRouter);

//Middleware de Erros
app.use(function(req, res, next) {
  let err = new Error ("Not Found")
  err.status = 404;
  next(err);
  });

  app.use(function(err, req, res, next) {
    return res.status(err.status || 500)
    .json({
      msg: err.message, 
      error: err
  });
});

module.exports = app;

