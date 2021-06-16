import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup, CLabel, CSelect
} from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calender() {
  const [startDate, setStartDate] = useState(new Date());
  const [primary, setPrimary] = useState(false);

  return (
    <div>
      <CButton
        color="primary"
        onClick={() => setPrimary(!primary)}
        className="mr-1"
      >
        추가
      </CButton>

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
      />

      <CModal
        show={primary}
        onClose={() => setPrimary(!primary)}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>회의실 예약</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="floor">Month</CLabel>
            <CSelect custom name="floor" id="floor">
              <option value="1">5층</option>
              <option value="2">6층</option>
            </CSelect>
          </CFormGroup>
		  if(floor==1){
			console.log({floor})

		  }
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setPrimary(!primary)}>
            등록
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setPrimary(!primary)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>

      {console.log("클릭한 날짜 startDate" + startDate)}
      {console.log("오늘 날짜 new Date()" + new Date())}
    </div>
  );
}

function Modal() {
  return <div></div>;
}

export default Calender;
