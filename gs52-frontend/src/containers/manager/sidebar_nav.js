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
    _children: ["관리자페이지"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "휴일관리",
    to: "/manager/setholiday",
    icon: "cil-description",
  },
  {
    _tag: "CSidebarNavItem",
    name: "주간업무보고",
    to: "/task/report",
    icon: "cil-Notes",
  },
];

export default _nav;
