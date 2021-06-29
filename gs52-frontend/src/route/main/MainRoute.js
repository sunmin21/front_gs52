import React from "react";
const Main = React.lazy(() => import("src/containers/main/Main"));
const Notice = React.lazy(() =>
  import("src/components/main/notice/DetailNotice")
);
const ManagerRoute = [
  {
    path: "/notice/detail/:id",
    name: "공지사항",
    component: Notice,
  },
  {
    path: "/",
    name: "홈",
    component: Main,
    exact: true,
  },
];

export default ManagerRoute;
