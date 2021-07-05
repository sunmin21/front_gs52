import React from "react";
import CIcon from "@coreui/icons-react";
import {getCurrentUser} from "../../lib/api/jwt/LoginAPI";
import { render } from "@testing-library/react";

const user = getCurrentUser();
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
    _children: ["Main"],
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: user.name,
  //   to: "/manager/VacationManage",
  //   icon: "cil-Notes",
  // },
];

export default _nav;
