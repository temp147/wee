/**
 * Created by root on 6/16/15.
 */
//test Wechat account config
module.exports = {
    secret: 'e474867b3ecb08caa14d22eb94787b74',
    mp: {
        appid: 'wx0ce2cd3f023755bf',
        token: 'ciicsh',
        encodingAESKey: 'AXY7qO8vrcNtQh0GjFyUjDquMDD53z4MJhnS6eyBHz1'
    },
    corp: {
        token: 'YOUR token',
        encodingAESKey: 'YOUR encodingAESKey',
        corpId: 'YOUR corpId'
    },
//wechat oauth redirect url
    oauthretureurl: 'http://wechatdev.ciicsh.com/callback.html'
};

//formal Wechat account config
/*
module.exports = {
    secret: '4cf1dc0c6f188fb09cf434cba2f68a82',
    mp: {
        appid: 'wxb3eb90d9522449a9',
        token: 'ciicsh',
        encodingAESKey: 'AXY7qO8vrcNtQh0GjFyUjDquMDD53z4MJhnS6eyBHz1'
    },
    corp: {
        token: 'YOUR token',
        encodingAESKey: 'YOUR encodingAESKey',
        corpId: 'YOUR corpId'
    },
//wechat oauth redirect url
    oauthretureurl: 'http://wechatdev.ciicsh.com/callback.html'
};*/
