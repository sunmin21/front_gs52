import "./App.css";
import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { TheLayout } from "./containers/common";
import Login from "./containers/emp/Login_prac";
import Regist from "./jwt/components/register.component";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
// const Test = React.lazy(() => import("./pages/test"));
function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login_prac"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />

<Route
            exact
            path="/regist"
            name="regist Page"
            render={(props) => <Regist {...props} />}
          />
          <Route
            render={(props) => {
              return <TheLayout {...props} />;
            }}
            path="/"
          />
          ;
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
