const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares

// logs HTTP request
app.use(morgan("tiny"));
// enable cors request
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// parse application/json
app.use(bodyParser.json());

// welcome page route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// routes
routes(app);

// init server and start listening on port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
