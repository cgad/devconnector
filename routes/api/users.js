// Deal with auth, login, passport, etc.

// To use the router, require express
const express = require("express");
// Instead of using app.get/post/whatever, we'll use router.get/post/whatever
const router = express.Router();
// Gravatar documentation: https://github.com/emerleite/node-gravatar
const gravatar = require("gravatar");
// To encrypt the password instead of plain text
const bcrypt = require("bcryptjs");
// Require JWT to create token for login. Documentation: https://www.npmjs.com/package/jsonwebtoken
const jwt = require("jsonwebtoken");
// For generating secret key in JWT
const keys = require("../../config/keys");
// To create a protected route
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load user model to use variable and any mongoose methods that it has
const User = require("../../models/User");

// Don't /api/users because we already did that in server.js
// @route  GET api/users/test
// @description  Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route  POST api/users/register
// @description  Register user
// @access  Public
// Use mongoose to first find if the email exists ie is already in the database.
// .findOne() to look for a record of the email the user is trying to register.
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body); // req.body includes everything sent to this route ie name, email, password

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }) // Pass in object to find email that matches req.body.email
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        // Create new user
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" // Default mm puts placeholder image if no gravatar
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar, // Same as avatar: avatar. Defined above
          password: req.body.password
        });

        // Generate a salt (random data that is used as an additional input to a one-way function that "hashes" data. Used to safeguard passwords in storage.)
        // Hash is what we store in the database
        // Password length of 10
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash; // Set plain text password to hash password
            newUser
              .save() // Mongoose method
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// @route  POST api/users/login
// @description  Login user / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body); // req.body includes everything sent to this route ie name, email, password

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password; // Plain text user input, but password in db is hashed

  // Find the user by email using User model in mongoose
  User.findOne({ email }) // email: email
    .then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check password
      bcrypt
        .compare(password, user.password) // Plain text, hashed password
        .then(isMatch => {
          if (isMatch) {
            // If user matched

            // Create JWT payload with user information
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };

            // Generate token here with what we want to include: payload, secret key from config file keys.js
            // To change or access secret key, do it in keys.js file in config and not in public code
            // Token expires in... x amount of time (3600ms = 1 hr, when it expires the user has to log back in)
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token // Bearer is a certain type of protocol to format token. Tack it on token so we don't have to do it when we make the actual request
                });
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        });
    });
});

// @route  GET api/users/current
// @description  Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    }); // Leaving out password
  }
);

module.exports = router;
