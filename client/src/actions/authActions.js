// Register User

// Call request and redirect to Login page on success
// If error, dispatch 'get errors' action to errors reducer

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { decode } from "punycode"; // Automatic. Necessary?

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

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

// Login - Get user token, add as Auth header in each request
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      // Set token to local storage as jwtToken (only stores strings)
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // Comes from errorReducer
      })
    );
};

// Set logged in user
// Dispatch and catch it in the auth reducder
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
