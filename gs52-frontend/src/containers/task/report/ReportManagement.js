import React from "react";
import { CRow, CCol, CCardBody } from "@coreui/react";
import CheckOthers from "src/components/task/report/CheckOthers";
import WeeklyReport from "src/components/task/report/WeeklyReport";
import EMPREPORT from "src/components/task/report/OthersList";

const ReportManagement = () => {
  return (
    <CRow>
      <CCol>
        <CCardBody>
          <CheckOthers Content={EMPREPORT} />
        </CCardBody>
        <CCardBody>
          <WeeklyReport />
        </CCardBody>
      </CCol>
    </CRow>
  );
};

export default ReportManagement;
