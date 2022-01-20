import React from "react";

import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import userEvent from "@testing-library/user-event";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import playerReducer from "../redux/reducers/playerReducer.js";
import loggingReducer from "../redux/reducers/loggingReducer.js";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage,
};

// import playerReducer from "../redux/reducers/playerReducer";
// import loggingReducer from "../redux/reducers/loggingReducer";

const TestProviders = ({ initState, initState2 }) => {
  initState ||= { playerList: [], answerList: [] };
  initState2 = { isLoggedIn: false, currentUser: {}, error: "" };

  let testReducerPlayer = () =>
    persistReducer(persistConfig, playerReducer(initState, { type: "@@INIT" }));

  let testReducerAuth = () =>
    persistReducer(
      persistConfig,
      loggingReducer(initState2, { type: "@@INIT" })
    );

  let store = createStore(
    combineReducers({
      player: testReducerPlayer,
      auth: testReducerAuth,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);

  return ({ children }) => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

const renderWithReduxProvider = (ui, options = {}) => {
  let TestWrapper = TestProviders(options);
  render(ui, { wrapper: TestWrapper, ...options });
};

global.renderWithReduxProvider = renderWithReduxProvider;
global.React = React;
global.render = render;
global.userEvent = userEvent;
