// Experience rules

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Validator's isEmpty method can only handle strings
  // If data.title is not empty, set it equal to data.title. Else, set it to empty string
  // Using the isEmpty method we created which can deal with things other than strings
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company title field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  // Pull these into every route that takes in data
  return {
    errors,
    isValid: isEmpty(errors) // If errors is empty, isEmpty is true and isValid is true
  };
};
