// for user posts and comments

// to use the router, require express
const express = require("express");
// instead of using app.get/post/whatever, we'll use router.get/post/whatever
const router = express.Router();

// don't /api/posts because we already did that in server.js
// @route  GET api/posts/test
// @description  Tests posts route
// @access  Public (Using JSON web tokens, we'll have private routes so only logged in user can access post request to create a profile. In order to access a private route, send token along with it, which you get by registering and logging in. Sends a token, which gets sent with your request.)
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

module.exports = router;
