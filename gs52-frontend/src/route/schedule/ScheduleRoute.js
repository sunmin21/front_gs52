import React from "react";
const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));
const confRoom = React.lazy(() =>
  import("../../containers/schedule/ConfLayout")
);

const ScheduleRoute = [
  { path: "/schedule/schedule", name: "개인스케줄", component: Dashboard },
  { path: "/schedule/confRoom", name: "회의실", component: confRoom },
  { path: "/schedule/insite", name: "팀별 인사이트", component: Dashboard },
];

export default ScheduleRoute;
