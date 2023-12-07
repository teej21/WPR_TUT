"use strict";
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});
app.get("/hello", function (req, res) {
  res.type("text");
  res.send("Hello World!");
});
app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);
  res.type("text");
  res.send(`'area': ${width * height}, 'perimeter': ${(width + height) * 2}`);
});
app.get("/cityInfo", function (req, res) {
  let state = req.query.state;
  let city = req.query.city;
  if (!(state && city)) {
    res
      .status(400)
      .send("Error: Missing required city and statequery parameters.");
  } else {
    res.send("You sent a request for " + city + ", " + state);
  }
});

app.get("/api", (req, res) => {
  res.type("application/json");
  res.send({ haha: "haha", hoho: "hoho" });
});
app.use(express.static("public"));
app.listen(8000);
console.log("http://localhost:8000");
