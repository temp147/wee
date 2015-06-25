/**
 * Created by root on 6/17/15.
 */

var wechatoauth = require('./functions/wechatoauth');
var wechatreply = require('./functions/wechatreply');

//handle the http options method,response 204
function option (req,res){
    res.status(204);
    res.send('end');
}

module.exports = function(app){

    app.use('/login/wechat/oauth',wechatoauth.oauth);
//    get login url
    app.get('/login/wechat/getauthurl',wechatoauth.getauthurl);
    app.use('/wechat', wechatreply.reply);

};