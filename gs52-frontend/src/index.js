import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer, { rootSaga } from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from "react-router-dom";

// import "core-js";
// import "./polyfill";
// import "react-app-polyfill/ie11"; // For IE 11 support
// import "react-app-polyfill/stable";

import { icons } from "./assets/icons";
import styled from "styled-components";
// import { createPromise } from "redux-promise-middleware";

// const customizedPromiseMiddleware = createPromise({
//   promiseTypeSuffixes: ["LOADING", "SUCCESS", "FAILURE"],
// });
const sagaMiddleware = createSagaMiddleware();
const stores = createStore(
  rootReducer,

  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
React.icons = icons;
const Hover = styled.div`
  @font-face {
    font-family: "InfinitySans-RegularA1";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "InfinitySans-RegularA1" !important;
  /* a {
    font-family: "GmarketSansMedium" !important;
  }
  a:hover {
    background-color: #4d5175 !important;
    color: #ffffff !important;
  } */
`;
ReactDOM.render(
  <Provider store={stores}>
    <BrowserRouter>
      <Hover>
        {" "}
        <App />{" "}
      </Hover>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
