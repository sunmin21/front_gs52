import React from "react";
const Login = React.lazy(() => import("src/containers/emp/LoginLayout"));
const EmpRoute = [
  {
    path: "/login",
    name: "로그인",
    component: Login,
  },
];

export default EmpRoute;
