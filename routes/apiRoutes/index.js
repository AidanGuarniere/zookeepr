const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

// animal routes
router.use(animalRoutes);

// zookeeper routes
router.use(require('./zookeeperRoutes'));

module.exports = router; 