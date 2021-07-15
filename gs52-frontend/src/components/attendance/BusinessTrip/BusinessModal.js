import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
} from "@coreui/react";

import { annualAxios, empvacationAxios } from "src/modules/annual/annual";
import { InserVacation } from "src/lib/api/attendance/AnnualAPI";

function BusinessModal({
  dateHandle,
  infoIndexHandle,
  contentsHandle,
  date,
  infoIndex,
  contents,

  annual,

  vacation_EMP_INDEX,
}) {
  const [info, setInfo] = useState(false);
  const [visible, setVisible] = useState(0);
  const [alertContents, setAlertContents] = useState();
  const dispatch = useDispatch();
  const moment = require("moment");
  var nDate = new Date();
  nDate.setDate(nDate.getDate() + 1);
  var nowDate = moment(nDate).format("YYYY-MM-DD");
  const [doubleCheck, setDoubleCheck] = useState(true);

  const onSubmit = async () => {
    var sameCount = 0;
    if (
      date == null ||
      infoIndex == null ||
      contents == null ||
      contents == "" ||
      infoIndex == "0"
    ) {
      setVisible(3);
      setAlertContents("모두 입력해주세요");
      setDoubleCheck(true);
    } else if (
      new Date(date).getDay() == "0" ||
      new Date(date).getDay() == "6"
    ) {
      setVisible(3);
      setAlertContents("공휴일은 사용할 수 없습니다.");
      setDoubleCheck(true);
    } else {
      annual.map((rowData) => {
        if (rowData.vacation_DATE == moment(date).format("YYYY-MM-DD")) {
          sameCount++;
        }
      });
      if (sameCount == 0) {
        await InserVacation(
          vacation_EMP_INDEX.index,
          infoIndex,
          date,
          contents,
          0
        );

        dispatch(annualAxios(vacation_EMP_INDEX.index));
        dispatch(empvacationAxios(vacation_EMP_INDEX.index));

        setInfo(!info);
      } else {
        setVisible(3);
        setAlertContents("이미 일정이 있습니다.");
        setDoubleCheck(true);
      }
    }
  };

  return (
    <div className="modalHandler">
      <CButton
        style={{ float: "right" }}
        color="info"
        onClick={() => {
          setInfo(!info);
          setDoubleCheck(true);
        }}
        className="mr-1"
      >
        신청
      </CButton>

      <CModal show={info} onClose={() => setInfo(!info)} color="info">
        <CModalHeader>
          <CModalTitle>연차 신청</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h1>날짜</h1>
          <input type="date" onChange={dateHandle} min={nowDate}></input>
          <hr />
          <h2>종류</h2>
          <select onChange={infoIndexHandle}>
            <option value="0">선택</option>
            <option value="5">외근</option>
            <option value="6">출장</option>
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
          <br></br>
          <div style={{ textAlign: "center", margin: "10px 20px 10px 20px" }}>
            <CAlert
              color="warning"
              show={visible}
              fade
              onShowChange={setVisible}
            >
              {alertContents}
            </CAlert>
          </div>
          <div className="container mt-4 mr-5">
            <div className="row float-right">
              <CButton color="secondary" onClick={() => setInfo(!info)}>
                취소
              </CButton>
              <CButton
                type="submit"
                color="info"
                onClick={() => {
                  if (doubleCheck) {
                    setDoubleCheck(false);
                    onSubmit();
                  }
                }}
              >
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

export default React.memo(BusinessModal);
