import React from "react";
const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));
const AnnualManage = React.lazy(() =>
  import("../../containers/attendance/AnnualManagement")
);

const MemberSchedule = React.lazy(() =>
  import("../../containers/attendance/MemberScheduleManagement")
);

const BusinessTrip = React.lazy(() =>
  import("../../containers/attendance/BusinessTripManagement")
);

const AttendanceRoute = [
  {
    path: "/attendance/schedule",
    name: "구성원스케줄",
    component: MemberSchedule,
    exact: true,
  },
  {
    path: "/attendance/AnnualManagement",
    name: "연차/반차",
    component: AnnualManage,
    exact: true,
  },
  {
    path: "/attendance/BusinessTrip",
    name: "출장/외근",
    component: BusinessTrip,
    exact: true,
  },
  { path: "/attendance/insite", name: "인사이트", component: Dashboard },
  {
    path: "/attendance",
    name: "근태관리",
    component: MemberSchedule,
    exact: true,
  },
];

export default AttendanceRoute;
