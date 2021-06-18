import React from "react";
const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));
const BusinessProgress = React.lazy(() =>
  import("src/components/task/BusinessProgress/BusinessProgress")
);

const TaskRoute = [
  { path: "/task/schedule", name: "업무진행사항", component: BusinessProgress },
  { path: "/task/report", name: "주간업무보고", component: Dashboard },
  { path: "/task", name: "업무관리", component: Dashboard },
];

export default TaskRoute;
