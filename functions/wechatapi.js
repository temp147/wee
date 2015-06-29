/**
 * Created by root on 6/25/15.
 */

var Wechatapi = require('wechat-api');
var fs = require('fs');
var assert = require('assert');
//load the models
var models = require('../models');
var Wechatkey = models.wechatkey;
//load config file
var wcconfig = require('../libs/wcconfig');

//todo: save the wechat api token into mysql
//get the wechat api token
/*
var api = new Wechatapi(wcconfig.mp.appid,wcconfig.secret
    ,
    function (callback) {
//read the token的from file方法
        fs.readFile('./access_token.txt', 'utf8', function (err, txt) {
//        console.log(JSON.parse(txt));
            if (err) {return callback(err);}
            callback(null, JSON.parse(txt));
        });
    },
    function (token, callback) {
//write the token的to the file及多机情况下使用，以下为写入到文件的示例
        fs.writeFile('./access_token.txt', JSON.stringify(token),callback)
    }
);
*/

var api = new Wechatapi(wcconfig.mp.appid,wcconfig.secret
    ,
//get the token from database
    function(cb){
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
    }
//save the token to database
    ,function(token,cb){
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

    }
);

api.getLatestToken(function(err,token){
//    console.log(err);
//    console.log(token);
});


//wechat JS SDK API
//todo: save the register in mysql
//register js sdk ticket handle
/*
api.registerTicketHandle(getTicketToken, saveTicketToken);
// getTicketToken
function getTicketToken(type, callback) {
    console.log(type);
    settingModel.getItem(type, {key: 'weixin_ticketToken'}, function (err, setting) {
        if (err) return callback(err);
        callback(null, setting.value);
    });
}
// saveTicketToken
function saveTicketToken(type, ticketToken, callback) {
    settingModel.setItem(type, {key:'weixin_ticketToken', value: ticketToken}, function (err) {
        if (err) return callback(err);
        callback(null);
    });
}
*/
api.registerTicketHandle(getTicketToken, saveTicketToken);
/**
 * get WeChat js SDK config params
 *
 * @param {String} type (method post: body{url:URL})
 * @param {String} cb
 * @api private
 */
function getTicketToken(type,cb){
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
}
/**
 * save WeChat js SDK config params
 *
 * @param {String} type (method post: body{url:URL})
 * @param {String} ticketToken
 * @param {String} cb
 * @api private
 */

function saveTicketToken(type,ticketToken,cb){
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
}

/**
 * get WeChat js SDK config params
 *
 * @param {String} req (method post: body{url:URL})
 * @param {String} res
 * @param {String} next
 * @return {String}
 * @api public
 */
exports.getWechatJsConfig = function(req,res,next){
    assert.ok(req.body.url&&req.body.url.length<50&&req.body.url.length>0,'url should not be blank');
    var param = {
        debug: true,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        url: req.body.url
    };
    api.getJsConfig(param,function(err,result){
        if(err){
            err.status=500;
            next(err);
        }
        else{
//            console.log(result);
            res.json(result);
        }
    });
};

//todo: create the menu create function and save the menu into DB
var menu = fs.readFileSync('./libs/wechat-menu.json');
if(menu){
    menu=JSON.parse(menu)
}
//console.log(menu);

exports.updateWechatMenu=api.createMenu(menu,function(err,result){
//    console.log(err);
//    console.log(result);
});

exports.getWechatMenu = api.getMenu(function(err,result){
//    console.log(err);
//    console.log(result);
});

exports.getWechatMenuConfig= api.getMenuConfig(function(err,result){
//    console.log(err);
//    console.log(result);
});