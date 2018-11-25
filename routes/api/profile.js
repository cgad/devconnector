// Create user profile including location, bio, experience, education, social network links, etc.

// To use the router, require express
const express = require("express");
// Instead of using app.get/post/whatever, we'll use router.get/post/whatever
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile model
const Profile = require("../../models/Profile");
// Load User model
const User = require("../../models/User");

// Don't need /api/profile first because we already did that in server.js
// @route  GET api/profiles/test
// @description  Tests profiles route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profiles works" }));

// @route  GET api/profile
// @description  Get current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
