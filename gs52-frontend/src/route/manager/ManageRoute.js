import React from "react";
const HolidayManagement = React.lazy(() => import("../../containers/manager/holiday/HolidayManagement"));
const informLayout = React.lazy(() => import("../../containers/informRegist/InformLayout"));

const ManagerRoute = [
  {
    path: "/manager/HolidayManagement",
    name: "휴일관리",
    component: HolidayManagement,
  },

  { path: "/manager/informLayout", name: "informLayout", component: informLayout}
    // { path: "/manager/test", name: "test", component:test}
];

export default ManagerRoute;
