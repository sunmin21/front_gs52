import React from "react";
const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));
const CreateTodo = React.lazy(() => import("src/containers/task/CreateTodo"));
const TodoBoard = React.lazy(() =>
  import("src/components/task/BusinessProgress/TodoBoardContent")
);
const BusinessProgress = React.lazy(() =>
  import("src/containers/task/BusinessProgress")
);
const ReportManagement = React.lazy(() =>
  import("../../containers/task/report/ReportManagement")
);

const TaskRoute = [
  // {
  //   path: "/task/schedule/SendContent/:id",
  //   name: "상세보기",
  //   component: TodoBoard,
  // },
  {
    path: "/task/schedule",
    name: "업무진행사항",
    component: BusinessProgress,
    exact: true,
  },
  {
    path: "/task/report",
    name: "주간업무보고",
    component: ReportManagement,
    exact: true,
  },
  {
    path: "/task/schedule/create",
    name: "요청보내기",
    component: CreateTodo,
    exact: true,
  },
  {
    path: "/task",
    name: "업무관리",
    component: BusinessProgress,
    exact: true
  },
];

export default TaskRoute;
