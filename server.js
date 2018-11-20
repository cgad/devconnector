const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport"); // Auth module

// Point certain URLs to these files
// For example, if the route is /api/users, connect to this file
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
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
// Everything else with Passport, put into config file
require("./config/passport")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// process.env.PORT necessary to deploy to heroku
const port = process.env.PORT || 3000;

// use ES6 template literal in console.log to put variable inside string. variable syntax: ${variable}
app.listen(port, () => console.log(`Server running on port ${port}`));
