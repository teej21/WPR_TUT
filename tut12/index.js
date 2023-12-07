const express = require("express");
const mysql = require("mysql2");
const app = express();
app.set("view engine", "ejs");
app.get("login", (req, res) => {
  res.render("login");
});

app.post("/", (req, res) => {
  "login",
    express.urlencoded({ extended: true }),
    (req, res) => {
      const { usename, password } = req.params.body;
    };
});
app.listen(8080);
console.log(`http://localhost:8080`);
