var PatientModel = require('mongoose').model('patient');
var tokenMaker = require('../util/token-maker');
var errCodes = require('../util/error-code');

module.exports={
  create:function(req,res,next){
    if(!req.body|| !req.body.phone || !req.body.password){
      return res.status(403).json(errCodes.MissingParameter);
    }

    PatientModel.findOne({phone:req.body.phone},function(err,doc){
      if(err){
        return next(err);
      }
      if(doc){
        return res.status(403).json(errCodes.PhoneRegistered);
      }
      var patient = new PatientModel(req.body);
      patient.save(function(err,doc){
        if(err){
          return next(err);
        }
        doc.password="";
        res.status(200);
        res.set('access-token',tokenMaker.generateAccessToken(doc.id));
        res.set('refresh-token',tokenMaker.generateRefreshToken(doc.id));
        res.json(doc);
      })

    });



  },
  updateById:function(req,res,next){
    if(!req.params.pid ||!req.body){
      return res.status(403).json(errCodes.MissingParameter);
    }
    PatientModel.findOne({_id:req.params.pid},function(err,doc){
      if(err){
        return next(err);
      }
      if(!doc){
        return res.status(403).json(errCodes.PhoneNotRegistered);
      }
      PatientModel.update({_id:req.params.pid},{$set:req.body},function(err,doc){
        if(err){
          return next(err);
        }
        doc.password="";
        res.status(200);
        return res.json(doc);
      })
    })
  },
  getById:function(req,res,next){
    if(!req.params.pid){
      return res.status(403).json(errcodes.MissingParameter);
    }
    PatientModel.findOne({_id:req.params.pid},function(err,doc){
      if(err){
        return next(err);
      }
      doc.password="";
      res.status(200);
      return res.json(doc)
    })
  },
  signin:function(req,res,next){
    if(!req.headers.phone || !req.headers.password){
      return res.status(403).json(errcodes.MissingParameter);
    }
    var phone = req.headers.phone;
    var password = require('crypto').createHash('sha1').update(req.headers.password.trim()).digest('hex');
    PatientModel.findOne({phone:req.headers.phone},function(err,doc){
      if(err){
        return next(err);
      }
      if(!doc){
        return res.status(403).json(errCodes.PhoneNotRegistered);
      }
      console.log('doc.password:',doc.password);
      console.log('password:',password);
      if(password === doc.password){
        var access_token = tokenMaker.generateAccessToken(doc.id);
        var refresh_token = tokenMaker.generateRefreshToken(doc.id);
        res.set('access-token',access_token);
        res.set('refresh-token',refresh_token);
        doc.password="";
        return res.json(doc);
      }else{
        return res.status(403).json(errcodes.WrongPassword);
      }
    })
  }
}
