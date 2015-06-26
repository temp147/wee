/**
 * Created by root on 6/25/15.
 */

var wechatapi = require('wechat-api');
var fs = require('fs');
var assert = require('assert');

//load config file
var wcconfig = require('../libs/wcconfig');

//todo: save the wechat api token into mysql
//get the wechat api token
var api = new wechatapi(wcconfig.mp.appid,wcconfig.secret
    ,
    function (callback) {
//read the token的from file方法
        fs.readFile('./access_token.txt', 'utf8', function (err, txt) {
//        console.log(JSON.parse(txt));
            if (err) {return callback(err);}
            callback(null, JSON.parse(txt));
        });
    },
    function (token, callback) {
//write the token的to the file及多机情况下使用，以下为写入到文件的示例
        fs.writeFile('./access_token.txt', JSON.stringify(token),callback)
    }
);

api.getLatestToken(function(err,token){
    console.log(err);
//    console.log(token);
});


//todo: save the register in mysql
//register js sdk ticket handle
/*
api.registerTicketHandle(getTicketToken, saveTicketToken);
// getTicketToken
function getTicketToken(type, callback) {
    console.log(type);
    settingModel.getItem(type, {key: 'weixin_ticketToken'}, function (err, setting) {
        if (err) return callback(err);
        callback(null, setting.value);
    });
}
// saveTicketToken
function saveTicketToken(type, ticketToken, callback) {
    settingModel.setItem(type, {key:'weixin_ticketToken', value: ticketToken}, function (err) {
        if (err) return callback(err);
        callback(null);
    });
}

*/



//todo: create the menu create function and save the menu into DB
var menu = fs.readFileSync('./libs/wechat-menu.json');
if(menu){
    menu=JSON.parse(menu)
}
//console.log(menu);

exports.updatewechatmenu=api.createMenu(menu,function(err,result){
//    console.log(err);
//    console.log(result);
});

exports.getwechatmenu = api.getMenu(function(err,result){
//    console.log(err);
//    console.log(result);
});

exports.getwechatmenuconfig= api.getMenuConfig(function(err,result){
//    console.log(err);
//    console.log(result);
});


/**
 * get WeChat js SDK config params
 *
 * @param {String} req (method post: body{url:URL})
 * @param {String} res
 * @param {String} next
 * @return {String}
 * @api public
 */
exports.getwechatjsconfig = function(req,res,next){
    assert.ok(req.body.url&&req.body.url.length<50&&req.body.url.length>0,'url should not be blank');
    var param = {
        debug: true,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        url: req.body.url
    };
    api.getJsConfig(param,function(err,result){
        if(err){
            err.status=500;
            next(err);
        }
        else{
            console.log(result);
            res.json(result);
        }
    });
};

