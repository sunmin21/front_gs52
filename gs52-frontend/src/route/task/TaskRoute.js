import React from "react";
const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));

const TaskRoute = [
  { path: "/task/schedule", name: "업무진행사항", component: Dashboard },
  { path: "/task/report", name: "주간업무보고", component: Dashboard },
];

export default TaskRoute;
