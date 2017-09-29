var express = require('express');
var router = express.Router();
var PatientController = require('../controllers/patient.controller');

//创建patient(用户注册)
router.post('/',PatientController.create);
//根据用户ID跟新用户资料
router.put('/:pid/basic-profile',PatientController.updateById);
//根据用户id读取基本资料
router.get('/:pid/basic-profile',PatientController.getById);








module.exports = router;
