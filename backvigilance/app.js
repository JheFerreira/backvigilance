let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require ('body-parser');



let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//Configuração de rotas
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next){
    let err = new Error ("Not Found")
    err.status = 404
        next(err)
})
//gerando o erro sem ser em html..."handlers"
app.use(function(err, req, res, next){
    return res.status(err.status || 500)
    .json({error: err.message || "INTERNAL ERROR"})
})
module.exports = app;