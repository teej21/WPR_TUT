"use strict";
const express = require("express");
const multer = require("multer");
const PORT = 8080;
const app = express();
app.use(express.urlencoded());
app.use(multer().none());

const myMiddleware = (req, res, next) => {
  console.log("This is my middleware!");
  next(); // Don't forget to call next to pass control to the next middleware in the stack.
};

// Using the middleware
app.use(myMiddleware);
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
app.post("/login", (req, res) => {
  const un = req.body.user;
  const pw = req.body.password;
  console.log(req.body);
  if (un === "admin" && pw === "admin") {
    res.send("Login Success");
  }
});
app.use(express.static("public"));
app.listen(PORT);
console.log(`http://localhost:${PORT}`);
console.log(`http://localhost:${PORT}/login/post.html`);
