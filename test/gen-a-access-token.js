var jwt = require('jsonwebtoken');
var config = require('../config/config');

console.log('t-access-token:',jwt.sign({timestamps:Date.now()/1000},config.jwtSecret))
