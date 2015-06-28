/**
 * Created by root on 6/25/15.
 */


var Oauth = require('wechat-oauth');
var jwt = require('jsonwebtoken');
var wcconfig = require('../libs/wcconfig');
var config = require('../libs/config');

var oauth = new Oauth(wcconfig.mp.appid,wcconfig.secret);


exports.getAuthUrl = function (req, res) {
    res.json({url:oauth.getAuthorizeURL(wcconfig.oauthretureurl,'state','snsapi_userinfo')});
};

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