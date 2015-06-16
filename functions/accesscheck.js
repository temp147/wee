/**
 * Created by root on 6/16/15.
 */

var crypto=require("crypto");

function isLegel(signature,timestamp,nonce,token){
    var array=new Array();
    array[0]=timestamp;
    array[1]=nonce;
    array[2]=token;
    array.sort();
    var hasher=crypto.createHash("sha1");
    var msg=array[0]+array[1]+array[2];
    hasher.update(msg);
    var msg=hasher.digest('h<span></span>ex');//计算SHA1值
    if(msg==signature){
        return true;
    }else{
        return false;
    }
}
module.exports.isLegel=isLegel;