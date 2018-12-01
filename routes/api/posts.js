// for user posts and comments

// to use the router, require express
const express = require("express");
// instead of using app.get/post/whatever, we'll use router.get/post/whatever
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");

// @route  GET api/posts/test
// @description  Tests posts route
// @access  Public (Using JSON web tokens, we'll have private routes so only logged in user can access post request to create a profile. In order to access a private route, send token along with it, which you get by registering and logging in. Sends a token, which gets sent with your request.)
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @route  GET api/posts
// @description  Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 }) // Sort by date
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({ nopostfound: "No posts found" }));
});

// @route  GET api/posts/:id
// @description  Get post by ID
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(400).json({ nopostfound: "No post found with that ID" })
    );
});

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

// @route  DELETE api/posts/:id
// @description  Delete post by ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          // req.user.id is logged in user
          if (post.user.toString() !== req.user.id) {
            // 401 = unauthorized status
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

// @route  POST api/posts/like/:post_id
// @description  Like post by ID
// @access  Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          // Check if user has already liked post
          // ie if user's ID is already in the post.likes array, they can't like it again
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user ID to likes array
          post.likes.unshift({ user: req.user.id });

          // Save to database
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

// @route  POST api/posts/unlike/:post_id
// @description  Delete post by ID
// @access  Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          // Check if user has already liked post
          // ie if user's ID is already in the post.likes array
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0 // If user is not in likes array
          ) {
            return res
              .status(400)
              .json({ notliked: "User has not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

// @route  POST api/posts/comment/:post_id
// @description  Add comment to post
// @access  Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route  DELETE api/posts/comment/:post_id/:comment_id
// @description  Delete comment from post
// @access  Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // Check if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index if exists
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
