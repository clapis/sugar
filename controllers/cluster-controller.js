var express = require('express');
var ClusterService = require('../services/cluster-service');

module.exports = ClusterController;

function ClusterController() {

    var router = express.Router();

    router.get('/level/:level', function(request, response, next) {

      var level = request.params.level;

      var service = new ClusterService();

      service.getClusters(level)
        .then(function(clusters) {
          response.send(clusters);
        })
        .catch(next);

    });

    return router;
}
