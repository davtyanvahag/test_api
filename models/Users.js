// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
// class User extends Model {}
// module.exports = User.init({
//     // attributes
//     id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//     },
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     companyId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'companies',
//             key: 'id'
//         }
//     }
// }, {
//     sequelize,
//     modelName: 'users'
//     // options
// });

'use strict'

module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'companies',
                    key: 'id'
                }
            }
        },
        {timestamps: false})

    var companies = sequelize.define('companies', {
            name: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {timestamps: false})

    users.belongsTo(companies, {foreignKey: 'company_id'});
    return users
}
