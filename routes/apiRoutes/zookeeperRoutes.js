// requirements
const {
    filterByQuery, 
    findById, 
    createNewZookeeper,
    validateZookeeper
} = require ("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers");
const router = require("express").Router();

// route to zookeepers
router.get("/zookeepers", (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// route to specific zookeeper based off of id, 404 if not found
router.get("/zookeepers/:id", (req, res) => {
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// post new zookeeper
router.post("/zookeepers", (req, res) => {
  req.body.id = zookeepers.length.toString();

  if (!validateZookeeper(req.body)) {
    res.status(400).send("The zookeeper is not properly formatted.");
  } else {
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeeper);
  }
});

module.exports = router;