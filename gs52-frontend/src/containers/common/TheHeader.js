import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,CButton
} from "@coreui/react";

// routes config
import User from "../../route/UserRoute";
import Admin from "../../route/AdminRoute";

import { logout, getCurrentUser } from "../../lib/api/jwt/LoginAPI";
import {EmpAxios} from "src/modules/main/mypage";

const TheHeader = () => {
  const history = useHistory();

  const user = getCurrentUser();

  const onLogout = () => {
    logout();
    history.push("/");
  };  
  const onMypage = () => {
    history.push("/Mypage");
  };

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow);
  const { emp_list } = useSelector((state) => {
    return {
      emp_list: state.mypage.emp_list,
    };
  });

  useEffect(async() => {
    await dispatch(EmpAxios(user.index));
  }, [dispatch]);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <img src="/logo/logom.png" height="48" alt="logom"></img>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/attendance">근태관리</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/schedule">일정관리</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/task">업무관리</CHeaderNavLink>
        </CHeaderNavItem>

        {user.roles == "ROLE_ADMIN" || user.roles=="ROLE_TEAMLEADER" ? (
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/manager">관리자페이지</CHeaderNavLink>
          </CHeaderNavItem>
        ) : null}
      </CHeaderNav>
      <CHeaderNav>
      <CButton style={{ textAlign: "right", margin:"auto"}} variant="ghost" color="dark" onClick={onMypage}>마이페이지</CButton>
        {user !== null ? <CButton style={{ textAlign: "right", margin:"auto", marginRight:"30px"}} variant="ghost" color="dark" onClick={onLogout}>로그아웃</CButton> : null}
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes= { (user.roles=="ROLE_USER")?
          User: Admin
          }
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
