/**
 * Created by root on 6/17/15.
 */

var wechatoauth = require('./functions/wechatoauth');
var wechatreply = require('./functions/wechatreply');
var wechatapijssdk   = require('./functions/wechatapijssdk');
var wechatapimenu   =   require('./functions/wechatapimenu');
//handle the http options method,response 204
function option (req,res){
    res.status(204);
    res.send('end');
}

module.exports = function(app){
//wechat oauth login callback api
    app.use('/login/wechat/oauth',wechatoauth.verifyOauth);
//    get login url
    app.get('/login/wechat/getauthurl',wechatoauth.getAuthUrl);

    app.options('/wechat/sdk/getjsconfig',option);
    app.use('/wechat/sdk/getjsconfig',wechatapijssdk.getWechatJsConfig);

    app.use('/wechat/menu/create',wechatapimenu.createMenu);
//    wechat communicate api
    app.use('/wechat', wechatreply.reply);

};

//todo: input the rights control api