var express=require('./config/express');
var mongoose = require('./config/mongoose');


var db= mongoose();
var app=express();


module.exports=app;
