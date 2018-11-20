const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String // When user enters email and registration, have logic to hit the avatar server. If there is an avatar, will put image into this field. If not, will put placeholder image.
    // Not required because not getting input, it'll be stored programatically using user's email input
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
