import React from "react";
const Login = React.lazy(() => import("src/containers/emp/LoginLayout"));
const First_login = React.lazy(() => import("src/containers/informRegist/Inform_Layout"));
const Regist = React.lazy(() => import("src/containers/manager/account/Account_Layout"));
const EmpRoute = [
  {
    path: "/login",
    name: "로그인",
    component: Login,
  },  
  {
    path: "/first_login",
    name: "첫로그인",
    component: First_login,
  },
  {
    path: "/regist",
    name: "회원등록",
    component: Regist,
  },
];

export default EmpRoute;
