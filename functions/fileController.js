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
var grid= require('gridfs-stream');
var fs = require('fs');
var util = require('util');

exports.fileUpload = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/tempdata";
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){
        if(!err){
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        }
        else{
            err.status=500;
            next(err);
        }
    })
};

