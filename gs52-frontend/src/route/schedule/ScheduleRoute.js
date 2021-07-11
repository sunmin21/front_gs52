import React from "react";

const Dashboard = React.lazy(() => import("../../views/dashboard/Dashboard"));
const confRoom = React.lazy(() =>
  import("../../containers/schedule/ConfLayout")
);
const Project = React.lazy(() => import("src/containers/schedule/Project"));
const ProjectCreate = React.lazy(() =>
  import("src/components/shedule/project/ProjectCreate")
);
const ProjectDetail = React.lazy(() =>
  import("src/components/shedule/project/ProjectDetail")
);

const PersonalSchedule = React.lazy(() =>
  import("src/containers/schedule/PersonalScheduleManagement")
);

const TeamInsightList = React.lazy(() =>
  import("../../containers/schedule/TeamInsightManagement")
);

const ScheduleRoute = [
  {
    path: "/schedule/schedule",
    name: "개인스케줄",
    component: PersonalSchedule,
    exact: true,
  },
  {
    path: "/schedule/confRoom",
    name: "회의실",
    component: confRoom,
    exact: true,
  },
  {
    path: "/schedule/project",
    name: "프로젝트",
    component: Project,
    exact: true,
  },

  {
    path: "/schedule/project/create",
    name: "프로젝트 생성",
    component: ProjectCreate,
    exact: true,
  },
  {
    path: "/schedule/project/detail",
    name: "프로젝트 상세보기",
    component: ProjectDetail,
    exact: true,
  },
  {
    path: "/schedule/insight",
    name: "팀별 인사이트",
    component: TeamInsightList,
    exact: true,
  },

  {
    path: "/schedule",
    name: "일정관리",
    component: PersonalSchedule,
    exact: true,
  },
];

export default ScheduleRoute;
