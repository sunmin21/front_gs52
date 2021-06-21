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

function RowDeleteModal({
  info,
  setInfo,
  event,
  setInputData,
  setRestVacation,
}) {
  // const [info, setInfo] = useState(false);
  const rowDelete = () => {
    var moment = require("moment");
    var nowDate = moment(new Date()).format("YYYY년 MM월 DD일");
    var clickDate = event.날짜;
    if (nowDate >= clickDate) {
      alert("소모된 휴가입니다.");
    } else {
      axios.post("/annual/delete", {
        vacation_INDEX: event.vacation_index,
      });
      if (event.연차유형 == "연차") {
        axios.post("/annual/update", {
          count: 1,
          emp_ID: 54321,
        });
        setRestVacation((content) => {
          content = content + 1;
          return content;
        });
      } else if (event.연차유형 == "반차") {
        axios.post("/annual/update", {
          count: 0.5,
          emp_ID: 54321,
        });
        setRestVacation((content) => {
          content = content + 0.5;
          return content;
        });
      }
      setInputData((content) => {
        return content.filter(
          (user) => user.vacation_index !== event.vacation_index
        );
      });
    }

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

export default RowDeleteModal;
