import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  // To use in components, get properties, do action, use {this.props.auth}
  auth: authReducer
});
