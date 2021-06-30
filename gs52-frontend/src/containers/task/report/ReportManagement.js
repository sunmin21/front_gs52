import React from "react";
import { CRow, CCol, CCardGroup, CCardBody } from "@coreui/react";
import CheckOthers from "src/components/task/report/CheckOthers";
import WeeklyReport from "src/components/task/report/WeeklyReport";
import Modal from 'src/components/task/report/OthersList'
// import Modal from 'src/components/task/BusinessProgress/Search'
const HolidayManagement = () => {
  return (
    <CRow>
      <CCol>
        <CCardBody>
          <CheckOthers Content={Modal} />
        </CCardBody>
        <CCardBody>
          <WeeklyReport />
        </CCardBody>
      </CCol>
    </CRow>
  );
};

export default HolidayManagement;
