const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
let ObjectId = Schema.Types.ObjectId;//主键 ，每个Schema都会默认配置这个属性，属性名为_id，除非自己定义，方可覆盖
const bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 6;
//创建我们的用户Schema
const userSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLonginAt:{type:Date,default:Date.now()}
},{
    collection:'user'
});

userSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err){return next(err)}
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err){return next(err)}
            this.password = hash;
            next();
        })
    })
});
userSchema.methods={
    comparePassword:(_psd,psd)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_psd,psd,(err,isMatch)=>{
                if(!err){resolve(isMatch)}
                else reject(err)
            })
        })
    }
}
//发布模型
mongoose.model('User',userSchema);

