var express = require('express');

var router = express.Router();

router.use('/account', require('./account-controller'));
router.use('/cluster', require('./cluster-controller'));

module.exports = router;
