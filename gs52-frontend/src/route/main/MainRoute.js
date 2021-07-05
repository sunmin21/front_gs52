import React from "react";
const Main = React.lazy(() => import("src/containers/main/Main"));
<<<<<<< Updated upstream
const Notice = React.lazy(() => import("src/components/main/CreateNotice"));
const ManagerRoute = [
=======
const NoticeDetail = React.lazy(() =>
  import("src/components/main/notice/DetailNotice")
);
const NoticeCreate = React.lazy(() =>
  import("src/components/main/notice/CreateNotice")
);

const MainRoute = [
>>>>>>> Stashed changes
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

export default MainRoute;
