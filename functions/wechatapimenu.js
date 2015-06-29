/**
 * Created by root on 6/29/15.
 */

var assert = require('assert');
var fs = require('fs');

var api = require('./wechatapi.js');

//todo: create the menu create function and save the menu into DB
var menu = fs.readFileSync('./libs/wechat-menu.json');
if(menu){
    menu=JSON.parse(menu)
}
//console.log(menu);

exports.updateWechatMenu=api.createMenu(menu,function(err,result){
//    console.log(err);
//    console.log(result);
});

exports.getWechatMenu = api.getMenu(function(err,result){
//    console.log(err);
//    console.log(result);
});

exports.getWechatMenuConfig= api.getMenuConfig(function(err,result){
//    console.log(err);
//    console.log(result);
});

exports.createMenu = function(req,res,next) {
    api.createMenu(menu, function (err, result) {
        if (err) {
            err.status = 500;
            next(err)
        }
        else{
            res.json('{message:success}')
        }
    });
};



/*
,
{
    "type": "view_limited",
    "name": "使用帮助",
    "media_id": "MEDIA_ID2"
}*/
