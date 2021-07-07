import React from "react";
const Main = React.lazy(() => import("src/containers/main/Main"));

const NoticeDetail = React.lazy(() =>
  import("src/components/main/notice/DetailNotice")
);
const NoticeCreate = React.lazy(() =>
  import("src/components/main/notice/CreateNotice")
);

const MainRoute = [
  {
    path: "/notice/create",
    name: "공지사항추가",
    component: NoticeCreate,
    exact:true,
  },
  {
    path: "/notice/detail/:id",
    name: "공지사항",
    component: NoticeDetail,
    exact:true,
  },
  {
    path: "/",
    name: "홈",
    component: Main,
    exact: true,
  },
];

export default MainRoute;
