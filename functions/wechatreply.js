/**
 * Created by root on 6/25/15.
 */

//load wechat intere
var wechat = require('wechat');
var wcconfig = require('../libs/wcconfig');

exports.reply=wechat(wcconfig.mp,function(req,res,next){
//        console.log(req);
//        console.log(req.query.code);
//        api.saveToken(req.query.code,function(){});
    var message = req.weixin;
    if(message.MsgType == 'text'){
        res.reply({type:"text",content:"you input"+message.Content});
    }
});
