import React from "react";


const Users = React.lazy(() => import("../views/users/Users"));
const User = React.lazy(() => import("../views/users/User"));

const Conf = React.lazy(() => import("../../containers/ConfLayout"));

const routes = [
  { path: "/", exact: true, name: "Home" },

  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },



  
  { path: "/confRoom", name: "Conf", component: Conf },
];

export default routes;
