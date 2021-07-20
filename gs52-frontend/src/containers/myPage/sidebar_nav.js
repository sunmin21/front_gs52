import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["마이페이지"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "계정 등록",
    to: "/maPage/myPage",
    icon: "cil-Notes",
  },
  {
    _tag: "CSidebarNavItem",
    name: "비밀번호 수정",
    to: "/myPage/pwdChange",
    icon: "cil-Notes",
  },
];

export default _nav;
