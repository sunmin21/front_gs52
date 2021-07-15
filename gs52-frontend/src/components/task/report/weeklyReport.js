import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CCard,
  CCardBody,
  CAlert,
  CCardGroup,
  CDataTable,
  CButton,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { reportAxios, nextreportAxios } from "src/modules/task/report";
import AddReport from "./AddReport";
import { DeleteReport } from "src/lib/api/task/ReportAPI";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

import "antd/dist/antd.css";
import { Button } from "antd";

function WeeklyReport() {
  const user = getCurrentUser();
  let [emp] = useState(user.index);

  let [lastDate] = useState();

  const [visible, setVisible] = useState(0);
  const [alertContents, setAlertContents] = useState();
  const [event, setEvent] = useState();

  const dispatch = useDispatch();
  const { report } = useSelector((state) => {
    return {
      report: state.report.report,
    };
  });
  const { nextreport } = useSelector((state) => {
    return {
      nextreport: state.report.nextreport,
    };
  });

  useEffect(() => {
    // dispatch(reportAxios(emp, weekStart, weekEnd))
  }, [dispatch]);

  useEffect(() => {
    showAllReport(startDate);
  }, [emp]);

  const fields = ["contents", "date"];
  const [startDate, setStartDate] = useState(new Date());

  var moment = require("moment");
  var weekStart = moment(startDate).day(0).format("YYYY-MM-DD");
  var weekEnd = moment(startDate).day(6).format("YYYY-MM-DD");

  const data = report.map((item) => {
    return {
      id: item.report_INDEX,
      emp: item.report_EMP_INDEX,
      contents: item.report_CONTENTS,
      date: item.report_TARGET_DATE,
    };
  });

  const nextdata = nextreport.map((item2) => {
    return {
      id: item2.report_INDEX,
      emp: item2.report_EMP_INDEX,
      contents: item2.report_CONTENTS,
      date: item2.report_TARGET_DATE,
    };
  });

  const showAllReport = (weekStart) => {
    setStartDate(weekStart);
    dispatch(
      reportAxios({
        emp,
        weekStart: moment(weekStart).day(0).format("YYYY-MM-DD"),
        weekEnd: moment(weekStart).day(6).format("YYYY-MM-DD"),
      })
    );

    dispatch(
      nextreportAxios({
        emp,
        weekStart: moment(weekStart).add(7, "d").day(0).format("YYYY-MM-DD"),
        weekEnd: moment(weekStart).add(7, "d").day(6).format("YYYY-MM-DD"),
      })
    );
  };

  const DeleteOnClick = async (e) => {
    lastDate = weekStart;
    await DeleteReport(e.id);
    await showAllReport(new Date(lastDate));
    setVisible(0)
  }

  // 열 클릭시 삭제 기능
  const eventOnClick = async (e) => {
    setVisible(true)
    setAlertContents("'" + e.contents + "' 삭제하시겠습니까?")
    setEvent(e);
  }

  const todayOnClick = (e) => {
    showAllReport(new Date());
  };

  // 화면을 실행 할 때 받아오는 변수값이 있으면 그걸로 실행
  // 없으면 오늘 날자로 타겟팅 !_!
  // lastDate => 추가할때 달력에서 골랐던 마지막 값
  //          => 삭제할때 달력에서 타겟됐던 마지막 값
  return (
    <CCard>
      <div style={{height:"50px"}} />
      <CCardGroup style={{ textAlign: "center" }}>
        <CCardBody>
          <h5>원하는 일자를 선택하세요 </h5>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              showAllReport(date);
            }}
            dateFormat="yyyy-MM-dd"
          />
          &nbsp;
          <CButton color="secondary" onClick={todayOnClick} className="mr-1">
            TODAY
          </CButton>
        </CCardBody>
        <CCardBody>
          <h5>선택된 주 : </h5>
          <h4>{weekStart + " - " + weekEnd}</h4>
        </CCardBody>
        <CCardBody>
          <AddReport showAllReport={showAllReport} />
        </CCardBody>
      </CCardGroup>
      <hr></hr>
      <div style={{ textAlign: "center", margin: "0px 80px" }}>
        <CAlert color="danger" show={visible} fade onShowChange={setVisible}>
          {alertContents}
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => {
                DeleteOnClick(event)
              }}            
              style={{margin:"0px 5px 0px 10px"}}
            >
              삭제
            </Button>
            <Button
              size="small"
              type="secondary"
              onClick={() => {
                setVisible(0)
            }}
              style={{margin:"0px 0px 0px 5px"}}
            >
              취소
          </Button>
        </CAlert>
      </div>
      <CCardGroup style={{ textAlign: "center" }}>
        <CCardBody>
          <h4>이번주</h4>
          <br />
          <CDataTable
            fields={fields}
            items={data}
            itemsPerPage={10}
            onRowClick={eventOnClick}
            // 자동 정렬
            sorterValue={{ column: "date", asc: "true" }}
            pagination
          />
        </CCardBody>
        <CCardBody>
          <h4>다음주</h4>
          <br />
          <CDataTable
            fields={fields}
            items={nextdata}
            itemsPerPage={10}
            onRowClick={eventOnClick}
            sorterValue={{ column: "date", asc: "true" }}
            pagination
          />
        </CCardBody>
      </CCardGroup>
    </CCard>
  );
}

export default WeeklyReport;