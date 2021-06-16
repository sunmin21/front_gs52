import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const Test = React.lazy(() => import("./pages/test"));
function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route render={(props) => <Test {...props} />} path="/" />;
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
