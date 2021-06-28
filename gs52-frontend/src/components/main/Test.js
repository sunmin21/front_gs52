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

const Test = () => {
  return (
    <CCol xs="12" md="12" className="mb-4">
      <CCard>
        <CCardHeader>
          캘린더
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
                <CNavLink>근무유형</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink>회의실</CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent></CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default Test;
