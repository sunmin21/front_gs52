import React from "react";
const HolidayManagement = React.lazy(() =>
  import("../../containers/manager/holiday/HolidayManagement")
);
const InformLayout = React.lazy(() =>
  import("../../containers/user/Inform_Layout")
);
const addOptions = React.lazy(() =>
  import("../../containers/manager/addOptions/addOption")
);
const addAccount = React.lazy(() =>
  import("../../containers/manager/account/Account_Layout")
);

const vacationManage = React.lazy(() =>
  import("../../containers/manager/vacationManage/VacationManage")
);

const ManagerRoute = [
  {
    path: "/manager/addOptions",
    name: "항목추가",
    component: addOptions,
    exact:true,
  },
  {
    path: "/manager/HolidayManagement",
    name: "휴일관리",
    component: HolidayManagement,
    exact:true,
  },
  {
    path: "/manager/addAccount",
    name: "계정등록",
    component: addAccount,
    exact:true,
  },
  {
    path: "/manager/VacationManage",
    name: "연차/출장관리",
    component: vacationManage,
    exact:true,
  },

  {
    path: "/manager/",
    name: "관리자페이지",
    exact:true,
    component: HolidayManagement,
  },
];

export default ManagerRoute;
