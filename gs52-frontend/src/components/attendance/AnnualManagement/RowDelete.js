import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
} from "@coreui/react";
import axios from "axios";

import React, { useState } from "react";

function RowDelete({ info, setInfo, event, setInputData }) {
  // const [info, setInfo] = useState(false);
  const rowDelete = () => {
    axios.post("/annual/delete", {
      vacation_INDEX: event.vacation_index,
    });

    setInputData((content) => {
      console.log(content);
      return content.filter(
        (user) => user.vacation_index !== event.vacation_index
      );
    });
    setInfo(!info);
  };
  return (
    <div className="modalHandler">
      <CModal show={info} onClose={() => setInfo(!info)} color="info">
        <CModalHeader closeButton>
          <CModalTitle>휴가 취소</CModalTitle>
        </CModalHeader>
        <CModalBody>{event.날짜}의 연차를 취소하겠습니까?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setInfo(!info)}>
            취소
          </CButton>
          <CButton color="info" onClick={() => rowDelete()}>
            확인
          </CButton>{" "}
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default RowDelete;
