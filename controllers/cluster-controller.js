var express = require('express');
var ClusterService = require('../services/cluster-service');

var router = express.Router();

router.get('/level/:level', function(request, response) {

  var level = request.params.level;

  var service = new ClusterService();

  service.getClusters(level)
    .then(function(clusters) {
      response.send(clusters);
    })
    .catch(function(error) {
      console.log(error);
      response.status(500).send('Oops.. something went wrong. Dont do that again.');
    });

});

module.exports = router;
