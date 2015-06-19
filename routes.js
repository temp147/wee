/**
 * Created by root on 6/17/15.
 */

//load wechat intere
var wechat = require('wechat');
var wechatapi = require('wechat-api');
//load config file
var config = require('./libs/config');

var fs = require('fs');

var api = new wechatapi(config.mp.appid,config.secret,
    function (callback) {
    // 传入一个获取全局token的方法
    fs.readFile('access_token.txt', 'utf8', function (err, txt) {
//        console.log(JSON.parse(txt));
        if (err) {return callback(err);}
        callback(null, JSON.parse(txt));
    });
},
    function (token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
        fs.writeFile('access_token.txt', JSON.stringify(token),callback)
}
);

api.getLatestToken(function(err,token){
    console.log(err);
    console.log(token);
});

//handle the http options method,response 204
function option (req,res){
    res.status(204);
    res.send('end');
}

module.exports = function(app){
    app.use('/wechat',wechat(config.mp,function(req,res,next){
//        console.log(req);
//        console.log(req.query.code);
//        api.saveToken(req.query.code,function(){});
        var menu = fs.readFileSync('./libs/wechat-menu.json');
        if(menu){
            menu=JSON.parse(menu)
        }
        api.createMenu(menu,function(err,result){});
        var message = req.weixin;
        if(message.MsgType == 'text'){
            res.reply({type:"text",content:"you input"+message.Content});
        }
    }));
};