import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
// import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
