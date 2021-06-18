import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import axios from "axios";

function AnnualModal({
  dateHandle,
  infoIndexHandle,
  contentsHandle,
  date,
  infoIndex,
  contents,
  setInputData,
}) {
  const [info, setInfo] = useState(false);
  const onSubmit = () => {
    if (
      date == null ||
      infoIndex == null ||
      contents == null ||
      infoIndex == "0"
    ) {
      console.log("널");
      alert("모두 입력해주세요");
    } else {
      axios.post("/annual/b", {
        vacation_EMP_ID: 54321, // 사원번호
        vacation_ATTEND_INFO_INDEX: infoIndex,
        vacation_DATE: date,
        vacation_CONTENTS: contents,
      });
      setInputData((content) => {
        console.log(infoIndex);
        console.log(date);
        var moment = require("moment");
        return content.concat({
          vacation_EMP_ID: 54321, // 사원번호
          연차유형: infoIndex,
          날짜: moment(date).format("YYYY년 MM월 DD일"),
          사유: contents,
        });
      });
      setInfo(!info);
    }
  };
  return (
    <div className="modalHandler">
      <CButton
        style={{ float: "right" }}
        color="info"
        onClick={() => setInfo(!info)}
        className="mr-1"
      >
        추가
      </CButton>

      <CModal show={info} onClose={() => setInfo(!info)} color="info">
        <CModalHeader>
          <CModalTitle>연차 신청</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h1>날짜</h1>
          <input type="date" onChange={dateHandle}></input>
          <hr />
          <h2>종류</h2>
          <select onChange={infoIndexHandle}>
            <option value="0">선택</option>
            <option value="1">연차</option>
            <option value="2">반차</option>
          </select>
          <hr />
          <h2>사유</h2>
          <textarea
            cols="50"
            rows="2"
            className="sapmleArea"
            placeholder="연차 신청 사유를 적어주세요."
            onChange={contentsHandle}
          ></textarea>
          <br></br>
          <div class="container mt-4 mr-5">
            <div class="row float-right">
              <CButton color="secondary" onClick={() => setInfo(!info)}>
                취소
              </CButton>
              <CButton type="submit" color="info" onClick={onSubmit}>
                확인
              </CButton>{" "}
            </div>
          </div>
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  );
}

export default AnnualModal;
