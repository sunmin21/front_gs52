import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardGroup,
  CDataTable,
  CButton,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { reportAxios, nextreportAxios } from "src/modules/task/report";
import AddReport from "./AddReport";
import { DeleteReport } from "src/lib/api/task/ReportAPI";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

function WeeklyReport() {
  const user = getCurrentUser();
  let [emp] = useState(user.index);

  let [lastDate] = useState();

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
    showAllReport(startDate)
  }, [emp])
  
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

  // ??? ????????? ?????? ??????
  const eventOnclick = (e) => {
    var msg = "?????????????????????????";

    if (window.confirm(msg) != 0) {
      console.log("??????");
      lastDate = weekStart;
      DeleteReport(e.id);
      showAllReport(new Date(lastDate));
      // ?????? ?????????
    } else {
      console.log("????????????");
    }
  };

  const todayOnClick = (e) => {
    showAllReport(new Date());
  };

  // ????????? ?????? ??? ??? ???????????? ???????????? ????????? ????????? ??????
  // ????????? ?????? ????????? ????????? !_!
  // lastDate => ???????????? ???????????? ????????? ????????? ???
  //          => ???????????? ???????????? ???????????? ????????? ???
  window.onload = function () {
    showAllReport(new Date());
  };
  return (
    <CCard>
      <CCardHeader>?????? ?????????</CCardHeader>
      <CCardGroup style={{ textAlign: "center" }}>
        <CCardBody>
          <h5>????????? ????????? ??????????????? </h5>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              showAllReport(date);
            }}
          />
          &nbsp;
          <CButton color="secondary" onClick={todayOnClick} className="mr-1">
            TODAY
          </CButton>
        </CCardBody>
        <CCardBody>
          <h5>????????? ??? : </h5>
          <h4>{weekStart + " - " + weekEnd}</h4>
        </CCardBody>
        <CCardBody>
          <AddReport showAllReport={showAllReport} />
        </CCardBody>
      </CCardGroup>
      <hr></hr>
      <CCardGroup style={{ textAlign: "center" }}>
        <CCardBody>
          <h4>?????????</h4>
          <br />
          <CDataTable
            fields={fields}
            items={data}
            itemsPerPage={10}
            onRowClick={eventOnclick}
            // ?????? ??????
            sorterValue={{ column: "date", asc: "true" }}
            pagination
          />
        </CCardBody>
        <CCardBody>
          <h4>?????????</h4>
          <br />
          <CDataTable
            fields={fields}
            items={nextdata}
            itemsPerPage={10}
            onRowClick={eventOnclick}
            sorterValue={{ column: "date", asc: "true" }}
            pagination
          />
        </CCardBody>
      </CCardGroup>
    </CCard>
  );
}

export default WeeklyReport;
