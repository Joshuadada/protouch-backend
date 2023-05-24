const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cakeContactRouter = require('./routes/cakeContact')
const hotelContactRouter = require('./routes/hotelContact')

const mongoose = require("mongoose");
const app = express();

// Connect database
mongoose.set('strictQuery', false);
mongoose.connect(
  "mongodb+srv://admin:dada@cluster0.rr61ffl.mongodb.net/Protouch?retryWrites=true&w=majority"
).then(() => {
  console.log('connected')
}).catch((err) => console.log(err));

// Enable CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/cake/contact', cakeContactRouter);
app.use('/api/v1/hotel/contact', hotelContactRouter);

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
