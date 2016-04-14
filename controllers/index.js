var express = require('express');

var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/cluster', require('./cluster-controller'));

module.exports = router;
