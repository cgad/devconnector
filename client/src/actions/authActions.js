// Register User

// Call request and redirect to Login page on success
// If error, dispatch 'get errors' action to errors reducer

import axios from "axios";

// Testing

import { GET_ERRORS } from "./types";

// Action creator, to Reducer
// Upon successful register, redirect to login
// If errors, show in form on frontend
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // Comes from errorReducer
      })
    );
};
