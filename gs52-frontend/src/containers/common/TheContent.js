import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import {getCurrentUser} from "../../lib/api/jwt/LoginAPI"

// routes config
//import routes from "../../route/routes";
import UserRoute from "../../route/UserRoute";
import AdminRoute from "../../route/AdminRoute";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  
  const user = getCurrentUser();

  // css 
  const contentStyle = {
    // backgroundColor : "purple"
    background:"linear-gradient( 185deg, #C6FFFF, #48E6FE, #489CFF 550px, #fff 10% )"
  }

  return (
    <main className="c-main" style={contentStyle}>
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
          <Admin></Admin>
                {/* { (user.roles=="ROLE_USER")?
                  <User></User>: <Admin></Admin>
               } */}

            {/* {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      (user.roles=="ROLE_USER")?
                      ( <CFade>
                        <route.component {...props} />
                      </CFade>):( alert("권한없음"))
                    )}
                  />
                )
              );
            })} */}
            {/* <Redirect from="/" to="/dashboard" /> */}
            {/* 이부분이 다시 거기로돌아가게해주는.. 그런역할.. 확인.  */}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

const User = () => {
  return (
    UserRoute.map((route, idx) => {
      return (
        route.component && (
          <Route
            key={idx}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={(props) => (
              <CFade>
                <route.component {...props} />
              </CFade>
            )}
          />
        )
      );
    })
  )
}
const Admin = () => {
  return (
    AdminRoute.map((route, idx) => {
      return (
        route.component && (
          <Route
            key={idx}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={(props) => (
              <CFade>
                <route.component {...props} />
              </CFade>
            )}
          />
        )
      );
    })
  )
}

export default React.memo(TheContent);
