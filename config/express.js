var express = require('express');
var bodyParser= require('body-parser');
var logger = require('morgan');
var authenticate = require('../app/middlewares/authenticate');

module.exports=function(){
  console.log('The Vean Server starts up !!')

  var app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(express.static('./public'));
  app.use(authenticate);

  app.use('/patients',require('../app/routes/patients'));
  app.use('/login',require('../app/routes/signin'))
  app.use('/access-token',require('../app/routes/re-access-token'))

  //handle 404

  app.use(function(req,res,next){
    res.status(404)
    try{
      return res.json('Not Found');
    }catch(e){
      console.err('404 set header after sent')
    }
  });
  //
  // app.use(function(err,res,req,next){
  //   if(!err){
  //     return next();
  //   }
  //   res.status(500);
  //   try{
  //     res.json(err.message||'Server Error')
  //   }catch(e){
  //     console.log('500 set header after sent');
  //   }
  // })

  return app;
}
