import React from "react";
const MyPage = React.lazy(() =>
  import("../../containers/myPage/MyPage")
);
const PwdChange = React.lazy(() =>
  import("../../containers/myPage/PwdChange")
);
const InformChange = React.lazy(() =>
  import("../../containers/myPage/InformChange")
);

const MypageRoute = [
  {
    path: "/myPage",
    name: "마이페이지",
    component: MyPage,
    exact: true,
  },
  {
    path: "/myPage/pwdChange",
    name: "비밀번호수정",
    component: PwdChange,
    exact: true,
  },
  {
    path: "/myPage/informChange",
    name: "회원정보수정",
    component: InformChange,
    exact: true,
  },
];

export default MypageRoute;
