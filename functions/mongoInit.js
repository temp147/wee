/**
 * Created by root on 10/29/15.
 */
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');

// @param {Object} app - express app instance
module.exports.init = function(app) {
    var Schema;
    var conn;

    Grid.mongo = mongoose.mongo;
    conn = mongoose.createConnection('mongodb://localhost/photo_app');
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', function () {
        var gfs = Grid(conn.db);
        app.set('gridfs', gfs);
        // all set!
    });

    app.set('mongoose', mongoose);
    Schema = mongoose.Schema;
    // setup the schema for DB
//    require('../db/schema')(Schema, app);
};