// Root Reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  // To use in components, get properties, do action, use {this.props.auth}
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
