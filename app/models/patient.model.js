var mongoose = require('mongoose');

var PatientModel = new mongoose.Schema({
  name:String,
  phone:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  refresh_token:String,
  avatar_url:String,
  birthday:{
    type:Date,
    default:Date.now
  },
  sex:{
    type:String,
    enum:['M','F']
  },
  weight:Number,
  height:Number,
  wenan_id:String,
}, {
  timestamps: { createdAt: 'created_at',updatedAt:'updated_at' }
}
);
PatientModel.pre('save',function(next){
  this.password = require('crypto').createHash('sha1').update(this.password).digest('hex');
  next();
});

mongoose.model('patient',PatientModel);
