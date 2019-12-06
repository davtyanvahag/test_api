// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
// class Company extends Model {}
// Company.init({
//     // attributes
//     id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     sequelize,
//     modelName: 'companies'
//     // options
// });


'use strict'
module.exports = function (sequelize, DataTypes) {
    var companies = sequelize.define('companies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {timestamps: false})
    return companies
}
