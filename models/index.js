/**
 * Created by root on 6/27/15.
 */


/**
 * Created by root on 5/20/15.
 *
 * This file has been generated with the sequelize CLI and collects all the models from the models directory and associates them if needed.
 *
 */
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config = require("./../libs/config.js");
var sequelize = new Sequelize(config.dbname, config.dbuser, config.dbpass,
    { dialect: config.dialect, host: config.dbhost, port: config.dbport,
        omitNull: true, logging: false });
var db        = {};

//load the models in the ./models  folders
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/*
 var models = [
 //    'PhoneNumber',
 //    'Task',
 'user'
 ];
 //export models;
 models.forEach(function(model) {
 module.exports[model] = sequelize.import(__dirname + '/' + model);
 });

 //export sequelize
 module.exports.sequelize=sequelize;


 // describe relationships
 /*
 (function(m) {
 m.PhoneNumber.belongsTo(m.User);
 m.Task.belongsTo(m.User);
 m.User.hasMany(m.Task);
 m.User.hasMany(m.PhoneNumber);
 })(module.exports);
 */