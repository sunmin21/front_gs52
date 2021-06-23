import React, { useEffect, useRef, useState } from "react";
import { Home } from "../../../lib/api/test";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CAlert,
} from "@coreui/react";

import axios from "axios";
import AnnualModal from "./AnnualModal";
import RowDeleteModal from "./RowDeleteModal";

const annual = ["날짜", "연차유형", "사유"];
const AnnualTables = () => {
  const [inputData, setInputData] = useState(null);
  const [restVacation, setRestVacation] = useState(0);
  const [date, setDate] = useState();
  const [infoIndex, setInfoIndex] = useState();
  const [contents, setContents] = useState();
  const [info, setInfo] = useState(false);
  const [visible, setVisible] = useState(0);
  const [event, setEvent] = useState({
    vacation_index: "",
    날짜: "",
    연차유형: "",
    사유: "",
  });

  const dateHandle = (e) => {
    setDate(e.target.value);
  };
  const infoIndexHandle = (e) => {
    setInfoIndex(parseInt(e.target.value));
  };
  const contentsHandle = (e) => {
    setContents(e.target.value);
  };

  const eventHandle = (e) => {
    var moment = require("moment");
    var nowDate = moment(new Date()).format("YYYY-MM-DD");
    var clickDate = e.날짜;
    if (nowDate >= clickDate) {
      setVisible(3);
    } else {
      setEvent(e);
      setInfo(!info);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      var moment = require("moment");

      const res = await axios.post("/annual/select", {
        //사원의 연차정보 전부 가져옴
        vacation_EMP_ID: 54321,
      });
      const re2 = await axios.post("/annual/select2", {
        //개인 사원의 잔여 연차 수를 가져옴
        vacation_EMP_ID: 54321,
      });
      const _inputData = await res.data.map((rowData) => ({
        vacation_index: rowData.vacation_INDEX,
        날짜: moment(rowData.vacation_DATE).format("YYYY-MM-DD"),
        연차유형: rowData.attend_TYPE_NAME,
        사유: rowData.vacation_CONTENTS,
      }));
      //inputData.concat(_inputData)
      setInputData(_inputData); // 연차 정보 테이블
      setRestVacation(re2.data[0].emp_VACATION); // 개인 사원의 잔여 연차 수
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <div class="container">
                <div class="row align-items-center h-100">
                  <div class="col-sm-8">
                    <h4>연차 사용 정보</h4>
                  </div>

                  <div class="col-sm-2">
                    <h5 class="text-center">잔여 휴가 </h5>
                  </div>
                  <div class="col-sm-1 ">
                    <h5>{restVacation}</h5>
                  </div>
                  <div class="col-sm-1">
                    <AnnualModal
                      dateHandle={dateHandle}
                      infoIndexHandle={infoIndexHandle}
                      contentsHandle={contentsHandle}
                      date={date}
                      infoIndex={infoIndex}
                      contents={contents}
                      inputData={inputData}
                      setInputData={setInputData}
                      setRestVacation={setRestVacation}
                    ></AnnualModal>
                  </div>
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={inputData}
                fields={annual}
                hover
                sorterValue={{ column: "날짜", desc: "true" }}
                striped
                bordered
                onRowClick={eventHandle}
                clickableRows
                size="sm"
                itemsPerPage={10}
                pagination
              />
              <RowDeleteModal
                info={info}
                setInfo={setInfo}
                event={event}
                setInputData={setInputData}
                setRestVacation={setRestVacation}
              ></RowDeleteModal>
              <CAlert
                color="info"
                show={visible}
                fade
                onShowChange={setVisible}
              >
                삭제할 수 없는 날짜입니다.
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AnnualTables;
