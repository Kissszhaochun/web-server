var router = require('express').Router();
var config = require('../../config/config');
var jwt = require('jsonwebtoken');
var tokenMaker = require('../util/token-maker');

router.get('/',function(req,res,next){
    var access_token = req.headers['access-token'];
    var refresh_token = req.headers['refresh-token'];
    if(!access_token || !refresh_token){
      return next();
    }
    jwt.verify(access_token,config.jwtSecret,function(err,result){
      if(err){
        if(err.name === 'TokenExpiredError'){
          jwt.verify(refresh_token,config.jwtSecret,function(err,decode){
            if(err){
              return res.json({success:false,name:err.name,message:err.message});
            }
            res.set('access-token',tokenMaker.generateAccessToken(decode.userId));
            res.set('refresh-token',tokenMaker.generateRefreshToken(decode.userId));
            return res.json({success:true,message:'refresh success'});
          })
        }else{
            return res.json({success:false,message:'兄弟，你的令牌不是我给你的'})
        }

      }else{
        return res.json({success:false,message:'兄弟，你的令还能用'})
      }
    });
})
module.exports = router;
