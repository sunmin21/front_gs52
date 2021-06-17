import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { DocsLink } from "src/reusable";

const AnnualModal = () => {
  const [info, setInfo] = useState(false);

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
          <form>
            <h1>날짜</h1>
            <input type="date"></input>
            <hr />
            <h2>종류</h2>
            <select name="annual">
              <option value="annual">연차</option>
              <option value="halfAnnual">반차</option>
            </select>
            <hr />
            <h2>사유</h2>
            <textarea
              cols="50"
              rows="2"
              className="sapmleArea"
              placeholder="연차 신청 사유를 적어주세요."
            ></textarea>
            <br></br>
            <div class="container mt-4 mr-5">
              <div class="row float-right">
                <CButton color="secondary" onClick={() => setInfo(!info)}>
                  취소
                </CButton>
                <CButton color="info" onClick={() => setInfo(!info)}>
                  확인
                </CButton>{" "}
              </div>
            </div>
          </form>
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  );
};

export default AnnualModal;
