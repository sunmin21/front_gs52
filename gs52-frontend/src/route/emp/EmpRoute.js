import React from "react";
<<<<<<< Updated upstream
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
=======
const First_login = React.lazy(() => import("src/containers/informRegist/Inform_Layout"));
const Regist = React.lazy(() => import("src/containers/manager/account/Account_Layout"));
const Login = React.lazy(()=>import("../../components/emp/Login"))
const EmpRoute = [

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
  // {
  //   path: "/login",
  //   name: "로그인",
  //   component: Login,
  // },
>>>>>>> Stashed changes
];

export default EmpRoute;
