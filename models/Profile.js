const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
// Associate user with profile
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // Associate user by ID
    ref: "users" // Reference 'users' collection
  },
  handle: {
    type: String,
    required: true,
    max: 40 // (characters)
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    // Select list with options like developer, jr developer, student etc.
    type: String,
    required: true
  },
  skills: {
    type: [String], // Array of strings
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    // To show latest 5 repositories
    type: String
  },
  experience: [
    // Array of objects
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        // If currently working there
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    // Array of objects
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        // If currently working there
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
