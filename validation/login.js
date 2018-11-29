// Login rules

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Validator's isEmpty method can only handle strings
  // If data.email is not empty, set it equal to data.email. Else, set it to empty string
  // Using the isEmpty method we created which can deal with things other than strings
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Validator's isEmail method
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Pull these into every route that takes in data
  return {
    errors,
    isValid: isEmpty(errors) // If errors is empty, isEmpty is true and isValid is true
  };
};
