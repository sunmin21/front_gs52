import React from "react";
const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));
const AnnualManage = React.lazy(() =>
  import("../../containers/attendance/AnnualManagement")
);

const MemberSchedule = React.lazy(() =>
  import("../../containers/attendance/MemberScheduleManagement")
);

const AttendanceRoute = [
  {
    path: "/attendance/schedule",
    name: "구성원스케줄",
    component: MemberSchedule,
  },
  {
    path: "/attendance/AnnualManagement",
    name: "연차관리",
    component: AnnualManage,
  },
  { path: "/attendance/insite", name: "인사이트", component: Dashboard },
  { path: "/attendance", name: "근태관리", component: Dashboard },
];

export default AttendanceRoute;
