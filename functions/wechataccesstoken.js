/**
 * Created by root on 6/29/15.
 */

//load the models
var models = require('../models');
var Wechatkey = models.wechatkey;

exports.getAccessToken = function(cb){
    Wechatkey.findOrCreate({where:{
        keytype: 'access_token'
    },
        defaults: {
            keyvalues:'{"accessToken":"Zpx5AhKQt70gnz5G-NzwhqcL4vAH-nz-WF94vsrevPs6VDQenkF4lfc_LXopeBVkxoRvlkjM1TDluBQp0cCgqAwhnMLcwHqFaayeBjL8-fQ","expireTime":1435505083212}',
            creator:'wechatapi getter function'
        }
    }).spread(function(wechatkey,created){
//            console.log(wechatkey);
        if(wechatkey){
//                console.log(JSON.parse(wechatkey.keyvalues));
            cb(null,JSON.parse(wechatkey.keyvalues))
        }
        else{
            cb('blank',null);
        }
    }).catch(function(err){
//            console.log(err);
        cb(err,null);
    })
};

exports.setAccessToken = function(token,cb){
    Wechatkey.findOrCreate({where:{
        keytype:'access_token'
    },
        defaults: {
            keyvalues:JSON.stringify(token),
            creator:'wechatapi setter function'
        }
    }).spread(function(wechatkey,created){
        if(created){
            cb(null,null);
        }
        else{
            wechatkey.keyvalues=JSON.stringify(token);
            wechatkey.modifier= 'wechatapi setter function';
            wechatkey.save()
                .then(function(){
                    cb(null,null);
                })
                .catch(function(err){
                    cb(err,null)
                })
        }
    }).catch(function(err){
        cb(err,null);
    })

};
