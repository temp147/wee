/**
 * Created by root on 6/17/15.
 */

//load wechat intere
var wechat = require('wechat');
var wechatapi = require('wechat-api');
//load config file
var config = require('./libs/config');

var fs = require('fs');

var api = new wechatapi(config.mp.appid,config.mp.encodingAESKey);


//handle the http options method,response 204
function option (req,res){
    res.status(204);
    res.send('end');
}

module.exports = function(app){
    app.use('/wechat',wechat(config.mp,function(req,res,next){
        var menu = fs.readFileSync('./libs/wechat-menu.json');
        if(menu){
            menu=JSON.parse(menu)
        }
        api.createMenu(menu,function(err,result){});
        var message = req.weixin;
        if(message.MsgType == 'text'){
            res.reply({type:"text",content:"you input"+message.Content});
        }
    }));
};