import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { annualAxios, empvacationAxios } from "src/modules/annual/annual";
import {
  InserVacation,
  UpdateVacation,
} from "src/lib/api/attendance/AnnualAPI";
import { ConsoleSqlOutlined } from "@ant-design/icons";

function AnnualModal({
  dateHandle,
  infoIndexHandle,
  contentsHandle,
  date,
  infoIndex,
  contents,
  inputData,
  annual,
  setInputData,
  setRestVacation,
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
      console.log(sameCount);
      if (sameCount == 0) {
        await InserVacation(5, infoIndex, date, contents, 0);

        console.log(infoIndex);
        if (infoIndex == "7") {
          await UpdateVacation(-1, 55555);
        } else if (infoIndex == "8") {
          await UpdateVacation(-0.5, 55555);
        } else if (infoIndex == "9") {
          await UpdateVacation(-0.5, 55555);
        }

        dispatch(annualAxios(vacation_EMP_INDEX.current));
        dispatch(empvacationAxios(vacation_EMP_INDEX.current));

        setInfo(!info);
      } else {
        setVisible(3);
        setAlertContents("휴가를 중복 사용할 수 없습니다.");
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
        추가
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
            <option value="7">연차</option>
            <option value="8">오전반차</option>
            <option value="9">오후반차</option>
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
          <CAlert color="info" show={visible} fade onShowChange={setVisible}>
            {alertContents}
          </CAlert>
          <div class="container mt-4 mr-5">
            <div class="row float-right">
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

export default AnnualModal;
