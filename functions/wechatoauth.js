/**
 * Created by root on 6/25/15.
 */


var Oauth = require('wechat-oauth');
var jwt = require('jsonwebtoken');
var wcconfig = require('../libs/wcconfig');
var config = require('../libs/config');
var token = require('./wechataccesstoken');

var oauth = new Oauth(wcconfig.mp.appid,wcconfig.secret, token.getAccessToken,token.setAccessToken);


exports.getAuthUrl = function (req, res) {
    res.json({url:oauth.getAuthorizeURL(wcconfig.oauthretureurl,'state','snsapi_userinfo')});
};

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
exports.verifyOauth = function (req,res,next){
    oauth.getAccessToken(req.query.code,function(err,result){
        if(err){
            err.status=401;
            next(err);
        }
        else{
            oauth.getUser(result.data.openid,function(err,result){
                if(err){
                    err.status=401;
                    next(err);
                }
                else{
                    var token = jwt.sign(result.openid,config.jwtsecret,{ expiresInMinutes: 60*5});
                    res.json({'token':token});
                }
            })
        }
    })
};

//todo: think about what to do if user do not agree to login