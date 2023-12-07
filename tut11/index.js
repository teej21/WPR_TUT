// "use strict";
// const port = 3000;
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const app = express();
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true })); // Apply urlencoded middleware before routes

// app.get("/page1", (req, res) => {
//   const userName = req.cookies.user_name;

//   if (userName) {
//     res.send(`Welcome ${userName}`);
//   } else {
//     res.send(
//       `You're not recognized.<br />Please register your name <a href="/page2">here</a>.`
//     );
//   }
// });
// app.get("/page2", (req, res) => {
//   res.send(`
//     <form action="/page2" method="post">
//       <label for="userName">Enter your name:</label>
//       <input type="text" id="userName" name="userName" required>
//       <button type="submit">Save</button>
//     </form>
//   `);
// });

// app.post("/page2", (req, res) => {
//   const userName = req.body.userName;

//   res.cookie("user_name", userName, { maxAge: 60000 }); // expires after 1 minute
//   res.redirect("/page1");
// });

// app.listen(port);
// console.log(`http://localhost:${port}/page1`);
"use strict";
const express = require("express");
const mysql = require("mysql2");
const ejs = require("ejs");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "student_management",
});

app.use(express.urlencoded({ extended: true })); // Use express.urlencoded middleware
db.connect((err) => {
  if (err) {
    console.log("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
app.set("view engine", "ejs");

app.get("/register", (req, res) => {
  res.render("register", { error: null, username: "", password: "" });
});

app.post("/register", async (req, res) => {
  const { username, password, reenterPassword } = req.body;

  try {
    // Check if the username already exists
    const [existingUserRows, existingUserFields] = await db.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUserRows.length > 0) {
      // Username already exists, show an error
      res.render("register", {
        error: "Username already exists",
        username,
        password,
      });
      return;
    }

    // Simulated validation conditions for illustration
    if (password === "") {
      res.render("register", {
        error: "Password cannot be empty",
        username,
        password,
      });
    } else if (password !== reenterPassword) {
      res.render("register", {
        error: "Passwords do not match",
        username,
        password,
      });
    } else {
      // Insert user into the database using the promise-based API
      const [insertedUserRows, insertedUserFields] = await db.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password]
      );

      console.log("User inserted successfully");
      // Show success message and clear the form
      res.render("register", {
        error: "Registration successful",
        username: "",
        password: "",
      });
    }
  } catch (err) {
    console.log("Error during registration:", err);
    // Handle the error
    res.render("register", {
      error: "An error occurred during registration",
      username,
      password,
    });
  }
});
app.listen(port, () => {
  console.log(`http:localhost:${port}`);
});
