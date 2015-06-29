/**
 * Created by root on 6/25/15.
 */
//load the wechat api
var Wechatapi = require('wechat-api');
//load the database models
var models = require('../models');
var Wechatkey = models.wechatkey;
//load config file
var wcconfig = require('../libs/wcconfig');

var token = require('./wechataccesstoken');

var api = new Wechatapi(wcconfig.mp.appid,wcconfig.secret, token.getAccessToken,token.setAccessToken);

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


module.exports=api;