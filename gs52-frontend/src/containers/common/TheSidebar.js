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

const TheSidebar = ({ nav }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);
  console.log(nav);
  console.log(nav.length !== 0 && nav[0]._children[0]);
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
