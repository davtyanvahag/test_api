var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController');

/* GET users listing. */
router.post('/:page/:limit', function(req, res, next) {
  UsersController.get(req, res);
});

router.post('/add', function(req, res, next) {
  UsersController.add(req, res);
});

router.put('/update/:id', function(req, res, next) {
  UsersController.update(req, res);
});

module.exports = router;
