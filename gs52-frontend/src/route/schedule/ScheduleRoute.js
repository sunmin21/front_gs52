import React from "react";
const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));

const ScheduleRoute = [
  { path: "/schedule/schedule", name: "개인스케줄", component: Dashboard },
  { path: "/schedule/meetingRoom", name: "회의실", component: Dashboard },
  { path: "/schedule/insite", name: "팀별 인사이트", component: Dashboard },
  { path: "/schedule", name: "일정관리", component: Dashboard },
];

export default ScheduleRoute;
