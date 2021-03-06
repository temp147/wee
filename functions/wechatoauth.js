/**
 * Created by root on 6/25/15.
 */


var Oauth = require('wechat-oauth');
var jwt = require('jsonwebtoken');
var wcconfig = require('../libs/wcconfig');
var config = require('../libs/config');
var token = require('./wechattoken');
var models = require('../models/');

var Wechatuser = models.wechatuser;


var oauth = new Oauth(wcconfig.mp.appid,wcconfig.secret,token.getOauthToken,token.saveOauthToken);

exports.getAuthUrl = function (req, res) {
    res.json({url:oauth.getAuthorizeURL(wcconfig.oauthretureurl,'state','snsapi_userinfo')});
};

/*
verifyOauth
 request:
 http method: get
 para: code=CODE&state=STATE
 response: {
 token:JWTTOKEN
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
                    var userProfile={};
//                    userProfile.userId=userId;
                    userProfile.openId=result.openid;
                    var token = jwt.sign(userProfile,config.jwtsecret,{ expiresInMinutes: 60*5});
                    res.json({'token':token});
                }
            })
        }
    })
};

//todo: think about what to do if user do not agree to login