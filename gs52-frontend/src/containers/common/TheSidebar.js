import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarHeader,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import Sidebar_Header from "../../components/main/sidebar/Sidebar_Header";
import styled from "styled-components";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
const TheSidebar = ({ nav }) => {
  const user = getCurrentUser();

  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);

  const ROLE_ADMIN = [
    "계정 등록",
    "항목추가",
    "연차/출장관리",
    "프로젝트관리",
    "휴일관리",
    "인사이트",
  ];
  const ROLE_TEAMLEADER = ["연차/출장관리", "프로젝트관리"];
  console.log(nav);
  if (nav.length !== 0 && nav[0]._children[0] === "관리자페이지") {
    if (user.roles[0] === "ROLE_ADMIN") {
      nav = nav.filter((item, key) => {
        if (key === 0) {
          return item;
        }
        if (key !== 0) {
          return ROLE_ADMIN.includes(item.name);
        }
      });
    } else if (user.roles[0] === "ROLE_TEAMLEADER") {
      nav = nav.filter((item, key) => {
        if (key === 0) {
          return item;
        }
        if (key !== 0) {
          return ROLE_TEAMLEADER.includes(item.name);
        }
      });
    }
  }
  console.log(nav);
  const Hover = styled.div`
    a:hover {
      background-color: #4d5175 !important;
      color: #ffffff !important;
    }
  `;
  return (
    <CSidebar
      style={{ boxShadow: "5px 5px 5px gray" }}
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
      style={{ background: "#2C2E43" }}
    >
      {/* sidebar 로고 자리 */}
      <CSidebarBrand
        className="d-md-down-none"
        to="/"
        style={{ background: "#2C2E43" }}
      >
        <CIcon
          className="c-sidebar-brand-full"
          src="logo/mainLogo1.png"
          name="logo-negative"
          width={200}
          height={105}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>

      <CSidebarHeader style={{ background: "#2C2E43" }}>
        <Sidebar_Header nav={nav}></Sidebar_Header>
      </CSidebarHeader>
      {nav.length !== 0 && nav[0]._children[0] !== "Main" && (
        <CSidebarNav style={{ background: "#2C2E43" }}>
          <Hover>
            <CCreateElement
              items={nav}
              components={{
                CSidebarNavDivider,
                CSidebarNavDropdown,
                CSidebarNavItem,
                CSidebarNavTitle,
              }}
            />
          </Hover>
        </CSidebarNav>
      )}
      {nav.length !== 0 && nav[0]._children[0] !== "Main" && (
        <CSidebarMinimizer
          style={{ background: "#2C2E43" }}
          className="c-d-md-down-none"
        />
      )}
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
