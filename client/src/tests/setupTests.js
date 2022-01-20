import React from "react";

import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import playerReducer from "../redux/reducers/playerReducer";
import loggingReducer from "../redux/reducers/loggingReducer";

const TestProviders = ({ initState, initState2 }) => {
  initState ||= { playerList: [], answerList: [] };
  initState2 = { isLoggedIn: false, currentUser: {} };

  let testReducerPlayer = () => playerReducer(initState, { type: "@@INIT" });
  let testReducerAuth = () => loggingReducer(initState2, { type: "@@INIT" });

  const testStore = createStore(
    combineReducers({
      player: testReducerPlayer,
      auth: testReducerAuth,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return ({ children }) => <Provider store={testStore}>{children}</Provider>;
};

const renderWithReduxProvider = (ui, options = {}) => {
  let TestWrapper = TestProviders(options);
  render(ui, { wrapper: TestWrapper, ...options });
};

global.renderWithReduxProvider = renderWithReduxProvider;
global.React = React;
