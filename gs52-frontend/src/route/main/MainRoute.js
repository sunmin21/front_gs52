import React from "react";
const Main = React.lazy(() => import("src/containers/main/Main"));
const ManagerRoute = [
  {
    path: "/",
    name: "메인",
    component: Main,
    exact: true,
  },
];

export default ManagerRoute;
