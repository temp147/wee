/**
 * Created by root on 10/29/15.
 */
/*

var shortId = require('shortid');

// @param {Object} app - express app instance
module.exports = function(app) {
    // get the gridfs instance
    var gridfs = app.get('gridfs');

    return {
        upload: function(req, res, next) {
            var is;
            var os;
            //get the extenstion of the file
            var extension = req.files.file.path.split(/[. ]+/).pop();
            is = fs.createReadStream(req.files.file.path);
            os = gridfs.createWriteStream({ filename: shortId.generate()+'.'+extension });
            is.pipe(os);

            os.on('close', function (file) {
                //delete file from temp folder
                fs.unlink(req.files.file.path, function() {
                    res.json(200, file);
                });
            });
        },
        getFileById: function(req, res, next) {
            var readstream = gridfs.createReadStream({
                _id: req.params.fileId
            });
            req.on('error', function(err) {
                res.send(500, err);
            });
            readstream.on('error', function (err) {
                res.send(500, err);
            });
            readstream.pipe(res);
        }
    };
};
*/

var formidable=require('formidable');
var gridfs= require('gridfs-stream');
var fs = require('fs');
var mongoose = require('mongoose');


exports.fileUpload = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/tempdata";
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){
        if(!err){
            var uploadFile=null;
            for(var k in files){
                uploadFile=files[k];
            }
//            gridfs.mongo=mongoose.mongo;
            var conn = mongoose.createConnection('mongodb://localhost/photo_app');
            conn.on('error', console.error.bind(console, 'connection error:'));
            conn.once('open', function () {
                var gfs = gridfs(conn.db,mongoose.mongo);
                var is;
                var os;
                //get the extenstion of the file
//                var extension = uploadFile.path.split(/[. ]+/).pop();
                is = fs.createReadStream(uploadFile.path);
//                os = gfs.createWriteStream({ filename: shortid.generate()+'.'+extension });
                os = gfs.createWriteStream({ filename: uploadFile.name});
                is.pipe(os);

                os.on('close', function (file) {
                    //delete file from temp folder
                    fs.unlink(uploadFile.path, function() {
                        res.json(200, file);
                    });
                })
            });
        }
        else{
            err.status=500;
            next(err);
        }
    })
};

exports.getFileById=function(req, res, next) {

    var conn = mongoose.createConnection('mongodb://localhost/photo_app');
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', function () {
        var gfs = gridfs(conn.db,mongoose.mongo);
        gfs.findOne({_id: req.params.fileid},function(err,file){
           if(err) {
               err.status = 500;
               next(err)
           }else if(!file){
               res.status('404').send('file does not exits');
           }
           else{
               var readstream = gfs.createReadStream({
                   _id: req.params.fileid
               });
               req.on('error', function(err) {
                   err.status = 500;
                   next(err)
               });
               readstream.on('error', function (err) {
                   err.status = 500;
                   next(err)
               });
               res.header("Content-Type", file.filename.split(/[. ]+/).pop());
               res.header("Content-Disposition", "attachment; filename="+file.filename);
               readstream.pipe(res);
           }


        })

    });
};