import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import playerReducer from "../reducers/playerReducer.js";
import loggingReducer from "../reducers/loggingReducer.js";

const store = createStore(
  combineReducers({
    player: playerReducer,
    auth: loggingReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
