import React from "react";
import { CRow, CCol, CCardGroup, CCardBody } from "@coreui/react";
import CheckOthers from "src/components/task/report/CheckOthers";
import WeeklyReport from "src/components/task/report/WeeklyReport";
import EMPLIST from 'src/components/task/report/OthersList'
const HolidayManagement = () => {
  return (
    <CRow>
      <CCol>
        <CCardBody>
          <CheckOthers Content={EMPLIST}/>
        </CCardBody>
        <CCardBody>
          <WeeklyReport />
        </CCardBody>
      </CCol>
    </CRow>
  );
};

export default HolidayManagement;
