var jwt = require('jsonwebtoken')
var config = require('../../config/config');

module.exports={
  generateAccessToken:function(userId){
    var userId = userId;
    var token = jwt.sign({userId:userId},config.jwtSecret,{expiresIn:'1h'});
    return token;
  },
  generateRefreshToken:function(userId){
    var refreshKey='refreshKey';
    var token = jwt.sign({refreshKey:refreshKey,userId:userId},config.jwtSecret,{expiresIn:'2h'});
    return token;
  }

}
