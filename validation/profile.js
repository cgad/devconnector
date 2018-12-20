// Profile rules

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // Validator's isEmpty method can only handle strings
  // If data.handle is not empty, set it equal to data.handle. Else, set it to empty string
  // Using the isEmpty method we created which can deal with things other than strings
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  console.log(data.website);

  if (!Validator.isLength(data.handle, { min: 4, max: 40 })) {
    errors.handle = "Handle must be between 4 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  // Non-required fields
  // If it's not empty...
  // Check to make sure it's a valid URL
  // Make all URLs start with http:// or https:// so the anchor tag to each link on the user's profile page works
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    } else if (
      !data.website.includes("http://") &&
      !data.website.includes("https://")
    ) {
      data.website = "http://" + data.website;
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    } else if (
      !data.twitter.includes("http://") &&
      !data.twitter.includes("https://")
    ) {
      data.twitter = "http://" + data.twitter;
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    } else if (
      !data.youtube.includes("http://") &&
      !data.youtube.includes("https://")
    ) {
      data.youtube = "http://" + data.youtube;
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    } else if (
      !data.facebook.includes("http://") &&
      !data.facebook.includes("https://")
    ) {
      data.facebook = "http://" + data.facebook;
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    } else if (
      !data.instagram.includes("http://") &&
      !data.instagram.includes("https://")
    ) {
      data.instagram = "http://" + data.instagram;
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    } else if (
      !data.linkedin.includes("http://") &&
      !data.linkedin.includes("https://")
    ) {
      data.linkedin = "http://" + data.linkedin;
    }
  }

  // Pull these into every route that takes in data
  return {
    errors,
    isValid: isEmpty(errors) // Valid if errors is empty
  };
};
