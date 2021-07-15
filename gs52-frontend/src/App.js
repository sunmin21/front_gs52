import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { TheLayout } from "./containers/common";
import { getCurrentUser } from "./lib/api/jwt/LoginAPI";
import PrivateRoute from "./route/LoginRoute";
import "antd/dist/antd.css";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  const user = getCurrentUser();

  return (
    /*
     *<Route {...parentProps}/>
    <Route exact path="/users" ..../> 
    */
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            render={(props) => {
              return <PrivateRoute {...props} />;
            }}
            path="/"
          />
          {/* 

        {
          user === null ?
          <Route exact path="/" component={Login} /> 
          :null
            
        }
          <Route
            render={(props) => {
            console.log("props")
            console.log(props)

            if(user === null){
              console.log("user NULLLLLLLLLLLL")			
              console.log(localStorage.getItem('users'))
              localStorage.getItem('users')
              return  <Route path="/" component={Login(user)} /> 
            }
            else{
              console.log("user OOOOOOOOOOOOOOOOOOO")			
              console.log(localStorage.getItem('user'))
              console.log(user.accessToken)
              localStorage.getItem('users')


              return <TheLayout {...props} />;
            }
            }}
            path="/"
          /> 
           */}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
