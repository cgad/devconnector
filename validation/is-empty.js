// Write own isEmpty function instead of using validator's isEmpty which only works with strings

// Returns true if value suits any of the cases. Returns false if value is not undefined/null/empty
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
