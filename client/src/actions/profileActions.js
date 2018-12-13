import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  // Set loading state before request
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
  // If there isn't a profile, return empty object as the profile so we can prompt user to create a profile
};

// Profile loading
// Let reducer know that profile is loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
