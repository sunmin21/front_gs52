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
  CSidebarHeader
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import Sidebar_Header from "../../components/main/sidebar/Sidebar_Header";

// sidebar nav config

const TheSidebar = ({ nav }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);

  return (
    <CSidebar
      style={{backgroundColor:"#EAEAEA"}}
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      {/* sidebar 로고 자리 */}
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          src="logo/mainLogo5.png"
          name="logo-negative"
          width={256}
          height={105}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>

      <CSidebarHeader style={{color:"black"}}>
        <Sidebar_Header></Sidebar_Header>
      </CSidebarHeader>

      <CSidebarNav>
        <CCreateElement
          // style={{backgroundColor:"red"}}
          items={nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
