var express = require('express');

var AccountController = require('./account-controller');
var ClusterController = require('./cluster-controller');

var router = express.Router();

router.use('/account', new AccountController());
router.use('/cluster', new ClusterController());

module.exports = router;
