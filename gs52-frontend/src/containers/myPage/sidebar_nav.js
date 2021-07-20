import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["마이페이지"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "마이페이지",
    to: "/myPage",
    icon: "cil-Notes",
  },
  {
    _tag: "CSidebarNavItem",
    name: "회원정보수정",
    to: "/myPage/informChange",
    icon: "cil-Notes",
  },
  {
    _tag: "CSidebarNavItem",
    name: "비밀번호수정",
    to: "/myPage/pwdChange",
    icon: "cil-Notes",
  },
];

export default _nav;
