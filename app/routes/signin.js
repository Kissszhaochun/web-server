var PatientModel = require('../controllers/patient.controller');


var router = require('express').Router();

router.post('/',function(req,res,next){
    var type = req.headers.type;
    if('PATIENT'===type){
      PatientModel.signin(req,res,next);
    }else if('DOCTOR'===type){
      res.json({message:'还没写'});
    }
});

module.exports = router;
