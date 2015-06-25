/**
 * Created by root on 6/25/15.
 */

var wechatapi = require('wechat-api');
var fs = require('fs');

//load config file
var wcconfig = require('../libs/wcconfig');


//get the wechat api token
var api = new wechatapi(wcconfig.mp.appid,wcconfig.secret
    ,
    function (callback) {
//read the token的from file方法
        fs.readFile('../access_token.txt', 'utf8', function (err, txt) {
//        console.log(JSON.parse(txt));
            if (err) {return callback(err);}
            callback(null, JSON.parse(txt));
        });
    },
    function (token, callback) {
//write the token的to the file及多机情况下使用，以下为写入到文件的示例
        fs.writeFile('../access_token.txt', JSON.stringify(token),callback)
    }
);



api.getLatestToken(function(err,token){
//    console.log(err);
    console.log(token);
});

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
    console.log(result);
});

exports.getwechatmenuconfig= api.getMenuConfig(function(err,result){
//    console.log(err);
    console.log(result);
});
