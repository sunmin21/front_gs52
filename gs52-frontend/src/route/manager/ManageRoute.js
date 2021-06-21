import React from "react";
const HolidayManagement = React.lazy(() => import("../../containers/manager/holiday/HolidayManagement"));
const InformLayout = React.lazy(() => import("../../containers/informRegist/Inform_Layout"));

const ManagerRoute = [
  {
    path: "/manager/HolidayManagement",
    name: "휴일관리",
    component: HolidayManagement,
  },

  { path: "/manager/informLayout", name: "informLayout", component: InformLayout}
];

export default ManagerRoute;
