import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import { DocsLink } from "src/reusable";
import Dept from "src/components/manager/addOptions/Dept";
import Team from "src/components/manager/addOptions/Team";
const addOption = () => {
  return (
    <>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
            항목 관리
            <DocsLink name="CTabs" />
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>부서</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>팀</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>직급</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>직책</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>회의실</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <Dept />
                </CTabPane>
                <CTabPane>
                  <Team />
                </CTabPane>
                <CTabPane></CTabPane>
                <CTabPane></CTabPane>
                <CTabPane></CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default addOption;
