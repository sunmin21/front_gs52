import React from "react";
const HolidayManagement = React.lazy(() =>
  import("../../containers/manager/holiday/HolidayManagement")
);
const InformLayout = React.lazy(() =>
  import("../../containers/informRegist/Inform_Layout")
);
const addOptions = React.lazy(() =>
  import("../../containers/manager/addOptions/addOption")
);

const ManagerRoute = [
  {
    path: "/manager/addOptions",
    name: "항목추가",
    component: addOptions,
  },
  {
    path: "/manager/HolidayManagement",
    name: "휴일관리",
    component: HolidayManagement,
  },
  {
    path: "/manager/informLayout",
    name: "informLayout",
    component: InformLayout,
  },
  {
    path: "/manager/",
    name: "관리자페이지",
    component: HolidayManagement,
  },
];

export default ManagerRoute;
