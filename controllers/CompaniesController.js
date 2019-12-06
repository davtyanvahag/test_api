var Companies = require('../models/index').companies;
const reqDataHelper = require('../helpers/reqDataHelper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.get = (req, res) => {
    reqDataHelper.validateReqData(req, 'body', [
    ], function (err, errProps) {
        if (!err) {
            var obj = {
                name: {[Op.ne]: null}
            }

            if (req.body.name && typeof req.body.name !== 'undefined') {
                obj.name = {[Op.like]: '%' + req.body.name + '%'}
            }


            Companies.findAndCountAll({
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

exports.getAll = (req, res) => {
    reqDataHelper.validateReqData(req, 'body', [
    ], function (err, errProps) {
        if (!err) {
            Companies.findAndCountAll({
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
        'name',
    ], function (err, errProps) {
        if (!err) {
            Companies
                .create({ name: req.body.name})
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
};

exports.update = (req, res) => {
    reqDataHelper.validateReqData(req, 'body', [
        'nameEdit',
    ], function (err, errProps) {
        if (!err) {
            Companies.update(
                { name: req.body.nameEdit},
                { where: {id: Number(req.params.id)}}
            )
            .then(function(rowsUpdated) {
                res.json(rowsUpdated)
            })
            .catch(error => {
                res.json({error: true})
            });
        } else {
            res.json({error: true, message: 'Validation Error: ' + errProps})
        }
    })
}


