var Users = require('../models/index').users;
const companies = require('../models/index').companies
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const reqDataHelper = require('../helpers/reqDataHelper');

exports.get = (req, res) => {
    console.log(req.body);

    reqDataHelper.validateReqData(req, 'body', [
    ], function (err, errProps) {
        if (!err) {
            var obj = {
                firstName: {[Op.ne]: null},
                lastName: {[Op.ne]: null}
            }

            if (req.body.firstName && typeof req.body.firstName !== 'undefined') {
                obj.firstName = {[Op.like]: '%' + req.body.firstName + '%'}
            }

            if (req.body.lastName && typeof req.body.lastName !== 'undefined') {
                obj.lastName = {[Op.like]: '%' + req.body.lastName + '%'}
            }
            console.log(obj)
            Users.findAndCountAll({
                include: [
                    {
                        model: companies
                    }
                ],
                where: obj,
                offset: Number(req.params.page) > 0 ? (Number(req.params.page) - 1) * Number(req.params.limit) : 0,
                limit: Number(req.params.limit),
            })
                .then(result => {
                    console.log(result.count);
                    console.log(result.rows);

                    res.json({error: false, count: result.count, rows: result.rows})
                })
                .catch(error => {
                    res.json({error: true})
                });
        } else {
            res.json({error: true, message: 'Validation Error: ' + errProps})
        }
    })
}

exports.add = (req, res) => {
    reqDataHelper.validateReqData(req, 'body', [
        'firstName',
        'lastName',
        'company_id',
    ], function (err, errProps) {
        if (!err) {
            Users
                .create({ firstName: req.body.firstName, lastName: req.body.lastName, company_id: req.body.company_id})
                .then(anotherTask => {
                    res.json({error: false})
                })
                .catch(error => {
                    res.json({error: true})
                })
        } else {
            res.json({error: true, message: 'Validation Error: ' + errProps})
        }
    })

}



exports.update = (req, res) => {
    reqDataHelper.validateReqData(req, 'body', [
        'firstNameEdit',
        'lastNameEdit',
        'company_idEdit',
    ], function (err, errProps) {
        if (!err) {
            Users.update(
                { firstName: req.body.firstNameEdit, lastName: req.body.lastNameEdit, company_id: req.body.company_idEdit},
                { where: {id: Number(req.params.id)}}
            )
                .then(function(rowsUpdated) {
                    res.json({error: false, data: rowsUpdated})
                })
                .catch(err => {
                    res.json({error: true, err: err})
                })
        } else {
            res.json({error: true, message: 'Validation Error: ' + errProps})
        }
    })

}
