const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport"); // Auth module
const path = require("path");

// Point certain URLs to these files
// For example, if the route is /api/users, connect to this file
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Initialize app
const app = express();

// Body parser middleware
// To access req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to mongoDB through mongoose, promise return with .then()
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    // Load index react file for any path hit here
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// process.env.PORT necessary to deploy to heroku
const port = process.env.PORT || 5000;

// Use ES6 template literal in console.log to put variable inside string. variable syntax: ${variable}
app.listen(port, () => console.log(`Server running on port ${port}`));
