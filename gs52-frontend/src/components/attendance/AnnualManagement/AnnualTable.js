import React, { useEffect, useState } from "react";
import { Home } from "../../../lib/api/test";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import axios from "axios";
import AnnualModal from "./AnnualModal";
import {
  CModal,
  CModalFooter,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CButton,
} from "@coreui/react";
import RowDelete from "./RowDelete";

const annual = ["날짜", "연차유형", "사유", "잔여휴가"];
const Tables = () => {
  const [inputData, setInputData] = useState(null);
  const [date, setDate] = useState();
  const [infoIndex, setInfoIndex] = useState(0);
  const [contents, setContents] = useState();
  const [info, setInfo] = useState(false);
  const [event, setEvent] = useState({
    vacation_index: "",
    날짜: "",
    연차유형: "",
    사유: "",
    잔여휴가: "",
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
    console.log(e);
    setEvent(e);
    setInfo(!info);
  };

  /*const rowDelete = (e) => {
    console.log("delteModal");
    console.log(e);
    if (window.confirm("삭제") != 0) {
      axios.post("/annual/delete", {
        vacation_INDEX: e.vacation_index,
      });
      window.location.reload();

      //YES Click
    } else {
      //No Click
    }
  };*/
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      var moment = require("moment");
      const res = await axios.post("/annual/select", {
        vacation_EMP_ID: 54321,
      });

      const _inputData = await res.data.map((rowData) => ({
        vacation_index: rowData.vacation_INDEX,
        날짜: moment(rowData.vacation_DATE).format("YYYY년 MM월 DD일"),
        연차유형: rowData.vacation_ATTEND_INFO_INDEX,
        사유: rowData.vacation_CONTENTS,
        잔여휴가: rowData.vacation_REMAIN,
      }));
      //inputData.concat(_inputData)
      setInputData(_inputData);
      console.log(_inputData);
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  console.log(info);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              연차 사용 정보
              <AnnualModal
                dateHandle={dateHandle}
                infoIndexHandle={infoIndexHandle}
                contentsHandle={contentsHandle}
                date={date}
                infoIndex={infoIndex}
                contents={contents}
                setInputData={setInputData}
              ></AnnualModal>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={inputData}
                fields={annual}
                hover
                sorter
                striped
                bordered
                onRowClick={eventHandle}
                clickableRows
                size="sm"
                itemsPerPage={10}
                pagination
              />
              <RowDelete
                info={info}
                setInfo={setInfo}
                event={event}
                setInputData={setInputData}
              ></RowDelete>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
