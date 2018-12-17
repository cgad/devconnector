// Education rules

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Validator's isEmpty method can only handle strings
  // If data.school is not empty, set it equal to data.school. Else, set it to empty string
  // Using the isEmpty method we created which can deal with things other than strings
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree or Certification field is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of Study field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From Date field is required";
  }

  // Pull these into every route that takes in data
  return {
    errors,
    isValid: isEmpty(errors) // If errors is empty, isEmpty is true and isValid is true
  };
};
