import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { TheLayout } from "./containers/common";
<<<<<<< Updated upstream
import Login from "./containers/emp/Login_prac";
import Regist from "./jwt/components/register.component";
=======
import {getCurrentUser} from "./lib/api/jwt/LoginAPI";
import Login from "./components/emp/Login";
import PrivateRoute from "./route/LoginRoute"


>>>>>>> Stashed changes
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {

  const user = getCurrentUser();

  console.log(user.id);

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
            console.log("props")
            console.log(props)
            return <PrivateRoute {...props} />;
            }
          }
          path="/"
          />



{/* 

         {
          user === null ?
          <Route exact path="/" component={Login} /> 
          :null
            
        }
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
