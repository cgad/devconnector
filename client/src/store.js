import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// called rootReducer index.js in reducers file
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

// Root reducer, state, middleware
// Implement redux extension in browser
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
