/**
 * Created by root on 6/29/15.
 */
var assert = require('assert');

var api = require('./wechatapi.js');

/**
 * get WeChat js SDK config params
 *
 * @param {String} req (method post: body{url:URL})
 * @param {String} res
 * @param {String} next
 * @return {String}
 * @api public
 */
exports.getWechatJsConfig = function(req,res,next){
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
//            console.log(result);
            res.json(result);
        }
    });
};