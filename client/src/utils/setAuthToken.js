// Set default header Auth with token
// If we have token in local storage, attach to auth header for every request

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete Auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
