var express = require('express');
var router = express.Router();
var CompaniesController = require('../controllers/CompaniesController');

/* GET home page. */
router.get('/:page/:limit', function(req, res, next) {
  CompaniesController.get(req, res)
});

router.get('/getAll', function(req, res, next) {
  CompaniesController.getAll(req, res)
});

router.post('/add', function(req, res, next) {
  CompaniesController.add(req, res)
});

router.put('/update/:id', function(req, res, next) {
  CompaniesController.update(req, res)
});

module.exports = router;
