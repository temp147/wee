/**
 * Created by root on 6/29/15.
 */

//load the models
var models = require('../models');
var Wechatkey = models.wechatkey;
var Wechatuser = models.wechatuser;

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

/**
 * get WeChat js SDK config params
 *
 * @param {String} type 'jsapi'
 * @param {String} cb  {err,Token}
 * @api public
 */
exports.getTicketToken = function (type,cb){
//    console.log(type);
    Wechatkey.findOrCreate({
        where:{
            keytype: type
        },
        defaults:{
            keytype: type,
            keyvalues:"{ 'ticket': 'sM4AOVdWfPE4DxkXGEs8VMqZSZfE1OkvX6gmFigI2I-Q_xtHl_rruJIyb_Wa1pVwyZqt2pmPRSeU2fvXZ7X5eg','expireTime': '1435503264637' }",
            creator: 'Ticket Token getter function'
        }
    })
        .spread(function(wechatkey,created){
            if(created){
                cb(null,'')
            }
            else{
                cb(null,JSON.parse(wechatkey.keyvalues))
            }
        })
        .catch(function(err){
            console.log(err);
            cb(err,null)
        })
};

/**
 * save WeChat js SDK config params
 *
 * @param {String} type  'jsapi'
 * @param {String} ticketToken '{'ticket':TICKET,'expireTime':EXPIRETIME}'
 * @param {String} cb  cb(err)
 * @api public
 */
exports.saveTicketToken = function (type,ticketToken,cb){
//    console.log(ticketToken);
    Wechatkey.findOrCreate({
        where:{
            keytype:type
        },
        defaults:{
            keytype:type,
            keyvalues:JSON.stringify(ticketToken),
            creator: 'Ticket Token setter function'
        }
    })
        .spread(function(wechatkey,created){
            if(created){
//                console.log(created);
                cb(null)
            }
            else{
                wechatkey.keyvalues = JSON.stringify(ticketToken);
                wechatkey.modifier = 'Ticket Token setter function';
                wechatkey.save()
                    .then(function(){
                        cb(null);
                    })
                    .catch(function(err){
                        cb(err);
                    })
            }
        })
        .catch(function (err) {
            cb(err);
        })
};



/**
 * get WeChat OauthToken by openid
 *
 * @param {String} openid
 * @param {String} cb  {err,oauthToken}
 * @api public
 */
exports.getOauthToken = function (openid,cb){
//    console.log(type);
    Wechatuser.findOrCreate({
        where:{
            OepnId: openid
        },
        defaults:{
            openId: openid,
            oauthToken:"{ 'ticket': '','expireTime': '1435503264637' }",
            creator: 'Oauth Token getter function'
        }
    })
        .spread(function(wechatuser,created){
            if(created){
                cb(null,'')
            }
            else{
                cb(null,JSON.parse(wechatuser.oauthToken))
            }
        })
        .catch(function(err){
            console.log(err);
            cb(err,null)
        })
};

/**
 * save WeChat Oauth Token by openid
 *
 * @param {String} openid
 * @param {String} OauthToken '{'ticket':TICKET,'expireTime':EXPIRETIME}'
 * @param {String} cb  cb(err)
 * @api public
 */
exports.saveOauthToken = function (openid,OauthToken,cb){
//    console.log(ticketToken);
    Wechatuser.findOrCreate({
        where:{
            openId:openid
        },
        defaults:{
            openId:openid,
            oauthToken:JSON.stringify(OauthToken),
            creator: 'Oauth Token setter function'
        }
    })
        .spread(function(wechatuser,created){
            if(created){
//                console.log(created);
                cb(null)
            }
            else{
                wechatuser.oauthToken = JSON.stringify(OauthToken);
                wechatuser.modifier = 'Oauth Token setter function';
                wechatuser.save()
                    .then(function(){
                        cb(null);
                    })
                    .catch(function(err){
                        cb(err);
                    })
            }
        })
        .catch(function (err) {
            cb(err);
        })
};


