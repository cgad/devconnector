const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
// Each post to have text, name and avatar
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    // Keep name and avatar separate so if they delete their profile, keep posts and comments
    // AKA don't populate by 'users' collection
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    // Array of user IDs
    // Link each like to the user who made the like
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    // Array of objects
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
