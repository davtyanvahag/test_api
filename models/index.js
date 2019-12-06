'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var db = {};
const ENV = require('dotenv').config({path: __dirname + '/../.env'});

var sequelize = new Sequelize(ENV.parsed.DB_NAME, ENV.parsed.DB_USER, ENV.parsed.DB_PASSWORD, {
    host: ENV.parsed.DB_HOST,
    port: ENV.parsed.DB_PORT,
    dialect: 'mysql'
});

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
        console.log(" model , : ", model);
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
sequelize.sync();
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
