import React from "react";
import { CRow, CCol, CCardBody, CCard } from "@coreui/react";
import CheckOthers from "src/components/task/report/CheckOthers";
import WeeklyReport from "src/components/task/report/weeklyReport";
import EMPREPORT from "src/components/task/report/OthersList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const ReportManagement = () => {
  const user = getCurrentUser();

  const contentStyle = {
    backgroundColor: "#3e4b54",
    width: "400px",
    textAlign: "center",
    boxShadow: "5px 5px 5px gray",
    padding: "8px",
    borderRadius: "50px",
  };

  return (
    <CRow>
      <CCol>
        <div style={contentStyle}>
          <h4 style={{ color: "white", marginTop: "5px" }}>
            나의 주간보고 조회하기
          </h4>
        </div>
        <CCardBody>
          {user.roles == "ROLE_TEAMLEADER" ? (
            <CheckOthers Content={EMPREPORT} />
          ) : null}
          {/* <CheckOthers Content={EMPREPORT} /> */}
        </CCardBody>
        <CCardBody>
          <WeeklyReport />
        </CCardBody>
      </CCol>
    </CRow>
  );
};

export default ReportManagement;
