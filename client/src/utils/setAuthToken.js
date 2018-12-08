// Set default header Auth with token

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete Auth header
    delete axios.defasults.headers.common["Authorization"];
  }
};

export default setAuthToken;
