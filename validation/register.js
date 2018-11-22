// Registration rules

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Registration name at least 2 characters, no more than 30
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  // Pull these into every route that takes in data
  return {
    errors,
    isValid: isEmpty(errors) // If errors is empty, isEmpty is true and isValid is true
  };
};
