// Passport strategy
// Documentation: https://www.npmjs.com/package/passport-jwt

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose"); // To search for user that comes with the payload
const keys = require("../config/keys");
const User = mongoose.model("users"); // "users" comes from User model in User.js

// Options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Passed in passport in server.js
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
    })
  );
};
