var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.mongodb);

module.exports=function(){
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open' , function(callback){
    console.log('mongodb is connected')
  })
  require('../app/models/patient.model')

  return db;
}
