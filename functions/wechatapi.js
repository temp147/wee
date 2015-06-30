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

var token = require('./wechattoken');

var api = new Wechatapi(wcconfig.mp.appid,wcconfig.secret, token.getAccessToken,token.setAccessToken);

api.registerTicketHandle(token.getTicketToken, token.saveTicketToken);

module.exports=api;