import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// called rootReducer index.js in reducers file
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

// root reducer, state, middleware
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
