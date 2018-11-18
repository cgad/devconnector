const express = require("express");
const mongoose = require("mongoose");

// point certain URLs to these files
// for example, if the route is /api/users, connect to this file
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

// initialize app
const app = express();

// DB config
const db = require("./config/keys").mongoURI;

// connect to mongoDB through mongoose, promise return with .then()
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// test route, take in req and res objects
app.get("/", (req, res) => res.send("hi!"));

// use routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// process.env.PORT necessary to deploy to heroku
const port = process.env.PORT || 5000;

// use ES6 template literal in console.log to put variable inside string. variable syntax: ${variable}
app.listen(port, () => console.log(`Server running on port ${port}`));
