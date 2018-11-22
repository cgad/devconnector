// Passport strategy
// Documentation: https://www.npmjs.com/package/passport-jwt

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose"); // To search for user that comes with the payload
const User = mongoose.model("users"); // "users" comes from User model in User.js
const keys = require("../config/keys");

// Options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Passed in passport in server.js
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Get user that's being sent in the token
      User.findById(jwt_payload.id)
        .then(user => {
          // If the user was found
          if (user) {
            return done(null, user);
          }
          return done(null, false); // False if no user found
        })
        .catch(err => console.log(err));
    })
  );
};
