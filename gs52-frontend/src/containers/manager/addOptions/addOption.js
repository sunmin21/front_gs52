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
import WorkRule from "src/components/manager/addOptions/WorkRule";
import ConfRoom from "src/components/manager/addOptions/ConfRoom";
const addOption = () => {
  const contentStyle = {
    backgroundColor: "#3e4b54",
    width: "400px",
    textAlign: "center",
    boxShadow: "5px 5px 5px gray",
    padding: "8px",
    borderRadius: "50px",
    marginBottom: "30px",
  };
  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>항목 추가</h4>
      </div>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
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
                  <CNavLink>근무유형</CNavLink>
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
                <CTabPane>
                  <WorkRule />
                </CTabPane>
                <CTabPane>
                  <ConfRoom />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default addOption;
