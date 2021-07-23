import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import ProjectManage from "src/components/manager/project/ProjectManage";
import ProjectAll from "src/components/manager/project/ProjectAll";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
const ProjectManagement = () => {
  const user = getCurrentUser();
  const contentStyle = {
    backgroundColor: "#3e4b54",
    width: "400px",
    textAlign: "center",
    boxShadow: "5px 5px 5px gray",
    padding: "8px",
    borderRadius: "50px",
    marginBottom: "10px",
  };
  console.log(user.roles[0]);
  console.log(user.index);
  return (
    <>
      <CCol xs="12" md="12" className="mb-4">
        <div style={contentStyle}>
          <h4 style={{ color: "white", marginTop: "5px" }}>
            프로젝트 항목 관리
          </h4>
        </div>

        <CCard style={{ marginTop: "30px" }}>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>프로젝트 승인</CNavLink>
                </CNavItem>
                {user.roles[0] === "ROLE_ADMIN" && (
                  <CNavItem>
                    <CNavLink>프로젝트 전체 목록</CNavLink>
                  </CNavItem>
                )}
              </CNav>
              <CTabContent>
                <CTabPane>
                  <ProjectManage roles={user.roles[0]} index={user.index} />
                </CTabPane>
                {user.roles[0] === "ROLE_ADMIN" && (
                  <CTabPane>
                    <ProjectAll roles={user.roles[0]} />
                  </CTabPane>
                )}
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default ProjectManagement;
