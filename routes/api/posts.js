// for user posts and comments

// to use the router, require express
const express = require("express");
// instead of using app.get/post/whatever, we'll use router.get/post/whatever
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");

// Validation
const validatePostInput = require("../../validation/post");

// @route  GET api/posts/test
// @description  Tests posts route
// @access  Public (Using JSON web tokens, we'll have private routes so only logged in user can access post request to create a profile. In order to access a private route, send token along with it, which you get by registering and logging in. Sends a token, which gets sent with your request.)
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @route  POST api/posts
// @description  Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar, // In react, pull name, avatar and user from the user state (when user is logged in, redux is going to keep user's info in the state throughout the entire app),
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
