// deal with auth, login, passport, etc.

// to use the router, require express
const express = require("express");
// instead of using app.get/post/whatever, we'll use router.get/post/whatever
const router = express.Router();

// don't /api/users because we already did that in server.js
// @route  GET api/users/test
// @description  Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

module.exports = router;
