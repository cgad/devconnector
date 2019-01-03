// Instead of including in each individual reducer

import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {}; // Entire state is {} and all errors go in the object
    default:
      return state;
  }
}
