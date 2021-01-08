// requirements
const fs = require("fs");
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// route JSOn data
app.use('/api', apiRoutes);
// route HTML
app.use('/', htmlRoutes);
const { animals } = require("./data/animals");
// access static front end code
app.use(express.static("public"));

// listen for PORT other than 3001
app.listen(PORT, () => {
  console.log(`API server now on ${PORT}!`);
});
