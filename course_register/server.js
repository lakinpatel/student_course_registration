
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),   // this is not being used in Assignment 1
 express = require('./config/express'),
 passport = require('./config/passport');
var db = mongoose();    // this is not being used in this Assignment1
 var app= express();
 var passport = passport();
 
 
module.exports = app;
app.listen(3000);
console.log('Server running at port#3000 !');