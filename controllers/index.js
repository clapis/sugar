var express = require('express');

var ErrorHandler = require('../error/error-handler');

var AccountController = require('./account-controller');
var ClusterController = require('./cluster-controller');

var router = express.Router();

router.use('/account', new AccountController());
router.use('/cluster', new ClusterController());

router.use(new ErrorHandler());

module.exports = { router: router };
