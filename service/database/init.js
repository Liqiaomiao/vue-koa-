const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/admin';
const glob = require ('glob');
const {resolve} = require('path');


exports.initSchemas=()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
};

const  option = {
    socketTimeoutMS: 45000,
    keepAlive: true,
    reconnectTries: 10,
    auto_reconnect: true,
    useNewUrlParser: true,
    user: 'admin',
    pass: 'admin'
};

exports.connect=()=>{
    mongoose.connect(url, option);
    const db = mongoose.connection;
    let maxConnctTimes = 0;

    return new Promise((resolve,reject)=>{
        db.on('disconnected',()=>{
            console.log('*****数据库断开******');
            if(maxConnctTimes<3){
                maxConnctTimes++
                mongoose.connect(url, option);
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理...')
            }
        })
        db.on('error',err=>{
            console.log('*****数据库错误******');
            console.log(err);
            if(maxConnctTimes<3){
                maxConnctTimes++;
                mongoose.connect(url, option);
            }else{
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理...')
            }
        })

        db.once('open',()=>{
            console.log('MongoDB connected successfully');
            resolve();
        })
    })

}
