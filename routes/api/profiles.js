// create user profile including location, bio, experience, education, social network links, etc.

// to use the router, require express
const express = require("express");
// instead of using app.get/post/whatever, we'll use router.get/post/whatever
const router = express.Router();

// don't /api/profiles because we already did that in server.js
// @route  GET api/profiles/test
// @description  Tests profiles route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profiles works" }));

module.exports = router;
