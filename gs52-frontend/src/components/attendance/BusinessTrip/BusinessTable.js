import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CAlert,
  CBadge,
} from "@coreui/react";

import axios from "axios";
import BusinessModal from "./BusinessModal";
import RowDeleteModal from "./RowDeleteModal";
import { annualAxios, empvacationAxios } from "src/modules/annual/annual";

const businessArr = ["날짜", "출장유형", "사유", "승인"];
const getBadge = (status) => {
  switch (status) {
    case "완료":
      return "success";
    case "Inactive":
      return "secondary";
    case "대기":
      return "warning";
    case "거절":
      return "danger";
    default:
      return "primary";
  }
};
const BusinessTables = ({ vacation_EMP_INDEX }) => {
  var moment = require("moment");
  const [doubleCheck, setDoubleCheck] = useState(true);
  const [inputData, setInputData] = useState([]);
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
    승인: "",
  });
  const dispatch = useDispatch();
  const { annual } = useSelector((state) => {
    return {
      annual: state.annual.annual,
    };
  });

  const { empvacation } = useSelector((state) => {
    return {
      empvacation: state.annual.empvacation,
    };
  });
  useEffect(() => {
    dispatch(annualAxios(vacation_EMP_INDEX.index));
    dispatch(empvacationAxios(vacation_EMP_INDEX.index));
  }, [dispatch]);

  //setInputData(data);
  const dateHandle = (e) => {
    setDate(e.target.value);
  };
  const infoIndexHandle = (e) => {
    setInfoIndex(parseInt(e.target.value));
  };
  const contentsHandle = (e) => {
    setContents(e.target.value);
  };

  const data = annual
    .filter(
      (item) =>
        item.vacation_ATTEND_INFO_INDEX < 7 &&
        item.vacation_ATTEND_INFO_INDEX > 4
    )
    .map((item) => {
      var status = null;
      if (item.vacation_STATUS == 0) {
        status = "대기";
      } else if (item.vacation_STATUS == 1) {
        status = "완료";
      } else {
        status = "거절";
      }
      return {
        vacation_index: item.vacation_INDEX,
        날짜: moment(item.vacation_DATE).format("YYYY-MM-DD"),
        출장유형: item.attend_TYPE_NAME,
        사유: item.vacation_CONTENTS,
        승인: status,
      };
    });

  const eventHandle = (e) => {
    var moment = require("moment");
    var nowDate = moment(new Date()).format("YYYY-MM-DD");
    var clickDate = e.날짜;
    if (nowDate >= clickDate || e.승인 == "거절") {
      setVisible(3);
    } else {
      setDoubleCheck(true);
      setEvent(e);
      setInfo(!info);
    }
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <div class="container">
                <div class="row align-items-center h-100">
                  <div class="col-sm-11">
                    <h4>출장 사용 정보</h4>
                  </div>

                  <div class="col-sm-1">
                    <BusinessModal
                      vacation_EMP_INDEX={vacation_EMP_INDEX}
                      dateHandle={dateHandle}
                      infoIndexHandle={infoIndexHandle}
                      contentsHandle={contentsHandle}
                      date={date}
                      infoIndex={infoIndex}
                      contents={contents}
                      inputData={data}
                      annual={annual}
                      setInputData={setInputData}
                      setRestVacation={setRestVacation}
                    ></BusinessModal>
                  </div>
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={data}
                fields={businessArr}
                hover
                sorterValue={{ column: "날짜", desc: "true" }}
                striped
                bordered
                onRowClick={eventHandle}
                clickableRows
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  승인: (item) => (
                    <td>
                      <h4>
                        <CBadge color={getBadge(item.승인)}>{item.승인}</CBadge>
                      </h4>
                    </td>
                  ),
                }}
              />
              <RowDeleteModal
                vacation_EMP_INDEX={vacation_EMP_INDEX}
                info={info}
                setInfo={setInfo}
                event={event}
                doubleCheck={doubleCheck}
                setDoubleCheck={setDoubleCheck}
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

export default React.memo(BusinessTables);
