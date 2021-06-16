import React from "react";
const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));

const AttendanceRoute = [
  { path: "/attendance/schedule", name: "구성원스케줄", component: Dashboard },
  { path: "/attendance/AnnualManage", name: "연차관리", component: Dashboard },
  { path: "/attendance/insite", name: "인사이트", component: Dashboard },
  { path: "/attendance", name: "근태관리", component: Dashboard },
];

export default AttendanceRoute;
