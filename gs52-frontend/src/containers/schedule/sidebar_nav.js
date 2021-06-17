import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "근태관리",
  //   to: "/atendance",
  //   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  //   badge: {
  //     color: "success",
  //     text: "사용",
  //   },
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["일정관리"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "개인스케줄",
    to: "/schedule/schedule",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "회의실",
    to: "/schedule/confRoom",
    icon: "cil-puzzle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "팀별 인사이트",
    to: "/schedule/manage",
    icon: "cil-chart-pie",
  },
];

export default _nav;
