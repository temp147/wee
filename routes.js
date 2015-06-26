/**
 * Created by root on 6/17/15.
 */

var wechatoauth = require('./functions/wechatoauth');
var wechatreply = require('./functions/wechatreply');
var wechatapi   = require('./functions/wechatapi');

//handle the http options method,response 204
function option (req,res){
    res.status(204);
    res.send('end');
}

module.exports = function(app){
//wechat oauth login callback api
    app.use('/login/wechat/oauth',wechatoauth.oauth);
//    get login url
    app.get('/login/wechat/getauthurl',wechatoauth.getauthurl);
/*

   get wechat sdk config
request:
   http method: post
   data: url=URL
response: {
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: , // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}
*/
    app.use('/wechat/sdk/getjsconfig',wechatapi.getwechatjsconfig);
//    wechat communicate api
    app.use('/wechat', wechatreply.reply);

};

//todo: input the rights control api