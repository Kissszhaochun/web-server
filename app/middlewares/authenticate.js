var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var tokenMarker = require('../util/token-maker');

module.exports=function(req,res,next){
    if(req.url === '/login' ||req.url==='/patients' ||req.url === '/access-token'){
      if(req.headers['t-access-token']){
        var t_access_token = req.headers['t-access-token'];
        jwt.verify(t_access_token,config.jwtSecret,function(err,decode){
          if(err){
            return res.json({success:false,name:err.name,message:err.message});
          }
          var now = Date.now()/1000;
          var exp = 15 * 60;
          if(now - decode.timestamps <= exp){
            return next();
          }else{
            return res.json({success:false,name:'t-access-token ExpiredError'});
          }
        })
      }else{
        return res.status(403).json(error.PermissionDenied);
      }
    }else{
          var token = req.headers['access-token'];
          if(!token){
            return res.status(403).json(error.PermissionDenied);
          }
          jwt.verify(token,config.jwtSecret,function(err,decode){
            if(err){
              return res.json({code:err.name,message:err.message});
            }
            console.log('decode:',decode);
            req.userId = decode.userId;
            res.set('access-token',tokenMarker.generateAccessToken(req.userId));
            res.set('refresh-token',tokenMarker.generateRefreshToken(req.userId));
            return next();
          })
    }
}
