import React from "react";
import {
  CCard,
  CCardBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCol,
  CRow,
  CCardHeader,
} from "@coreui/react";

import ProjectContent from "./projectDetail/ProjectContent";

function ShowProject() {
  return (
    <>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>프로젝트</CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>프로젝트 개요</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>보낸 요청</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>완료한 요청</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <ProjectContent />
                </CTabPane>
                <CTabPane></CTabPane>
                <CTabPane></CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
}

export default ShowProject;
