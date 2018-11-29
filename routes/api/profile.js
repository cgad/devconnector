// Create user profile including location, bio, experience, education, social network links, etc.

// To use the router, require express
const express = require("express");
// Instead of using app.get/post/whatever, we'll use router.get/post/whatever
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
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
      // We referenced 'users' collection inside the profile model so now populate with the user fields 'name' and 'avatar'
      .populate("user", ["name", "avatar"])
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

// @route  POST api/profile
// @description  Create or Edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    // (Experience and Education are separate forms)
    const profileFields = {};

    profileFields.user = req.user.id; // User comes from req.user.id, not the form. Includes avatar, name, email
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // Skills- Split into array instead of having comma-separated values
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social- Initialize as empty object so profileFields.social already exists and we can add to it without it saying profileFields.social doesn't exist
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
