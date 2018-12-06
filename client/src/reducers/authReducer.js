import { TEST_DISPATCH } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
    // Add to what's already in the state with a spread operator ...
    // Send payload, which includes userData, and set user object in initialState which fills user with payload which is userData from authActions.js
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
