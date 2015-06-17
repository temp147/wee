/**
 * Created by root on 6/17/15.
 */

//load wechat intere
var wechat = require('wechat');
//load config file
var config = require('./libs/config');


//handle the http options method,response 204
function option (req,res){
    res.status(204);
    res.send('end');
}

module.exports = function(app){
    app.use('/wechat',wechat(config.mp,function(req,res,next){
        var message = req.weixin;
        if(message.MsgType == 'text'){
            res.reply({type:"text",content:"you input"+message.Content});
        }
    }));
};