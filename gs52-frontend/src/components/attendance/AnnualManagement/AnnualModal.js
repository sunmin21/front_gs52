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
  inputData,
  setInputData,
  setRestVacation,
}) {
  const [info, setInfo] = useState(false);

  const onSubmit = () => {
    var moment = require("moment");
    var sameCount = 0;
    if (
      date == null ||
      infoIndex == null ||
      contents == null ||
      infoIndex == "0"
    ) {
      alert("다시 입력해주세요");
    } else {
      inputData.map((rowData) => {
        if (rowData.날짜 == moment(date).format("YYYY년 MM월 DD일")) {
          sameCount++;
        }
      });
      if (sameCount == 0) {
        axios.post("/annual/insert", {
          vacation_EMP_ID: 54321, // 사원번호
          vacation_ATTEND_INFO_INDEX: infoIndex,
          vacation_DATE: date,
          vacation_CONTENTS: contents,
        });
        if (infoIndex == "7") {
          axios.post("/annual/update", {
            count: -1,
            emp_ID: 54321,
          });
        } else if (infoIndex == "8") {
          axios.post("/annual/update", {
            count: -0.5,
            emp_ID: 54321,
          });
        }
        setRestVacation((content) => {
          if (infoIndex == "7") {
            content = content - 1;
            return content;
          } else if (infoIndex == "8") {
            content = content - 0.5;
            return content;
          }
        });
        setInputData((content) => {
          return content.concat({
            vacation_EMP_ID: 54321, // 사원번호
            연차유형: infoIndex == "7" ? "연차" : "반차",
            날짜: moment(date).format("YYYY년 MM월 DD일"),
            사유: contents,
          });
        });

        setInfo(!info);
      } else {
        alert("휴가를 중복 사용할 수 없습니다.");
      }
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
            <option value="7">연차</option>
            <option value="8">반차</option>
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
