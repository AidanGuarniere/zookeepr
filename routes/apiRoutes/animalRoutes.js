// requirements
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../../lib/animals");
const { animals } = require("../../data/animals");
const router = require("express").Router();

// route to animals
router.get("/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// route to specific animal based on ID, 404 error if not found
router.get("/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// post new animal
router.post("/animals", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res
      .status(400)
      .send("The animal you tried to enter is not properly formatted.");
  } else {
    // add animal to json file and animals array
    const animal = createNewAnimal(req.body, animals);

    res.json(animal);
  }
});

module.exports = router;
