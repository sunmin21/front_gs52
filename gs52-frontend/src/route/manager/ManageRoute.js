import React from "react";
const HolidayManagement = React.lazy(() => import("../../containers/manager/holiday/HolidayManagement"));
const InformLayout = React.lazy(() => import("../../containers/informRegist/Inform_Layout"));
const AccountRegist = React.lazy(() => import("../../containers/manager/accountRegist/Account_Layout"));

const ManagerRoute = [
  {
    path: "/manager/HolidayManagement",
    name: "휴일관리",
    component: HolidayManagement,
  },

  { path: "/manager/informLayout", name: "informLayout", component: InformLayout},
  { path: "/manager/accountRegist", name: "계정 등록", component: AccountRegist}
];

export default ManagerRoute;
