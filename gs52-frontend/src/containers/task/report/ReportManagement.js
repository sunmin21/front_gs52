import React from "react";
import { CRow, CCol, CCardBody } from "@coreui/react";
import CheckOthers from "src/components/task/report/CheckOthers";
import WeeklyReport from "src/components/task/report/WeeklyReport";
import EMPREPORT from "src/components/task/report/OthersList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const ReportManagement = () => {
  const user = getCurrentUser();

  return (
    <CRow>
      <CCol>
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
