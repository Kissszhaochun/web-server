var app = require('../app.js');
var config = require('../config/config');

app.listen(config.port,function(){
  console.log('app started at',config.port);
});
