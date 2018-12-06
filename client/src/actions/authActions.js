// Register User

// Call request and redirect to Login page on success
// If error, dispatch 'get errors' action to errors reducer

// Testing

import { TEST_DISPATCH } from "./types";

// Action
export const registeruser = userData => {
  // Return object w/ a type to dispatch something to the reducer
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
