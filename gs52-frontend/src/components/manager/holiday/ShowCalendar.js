import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { CCardBody, CAlert } from "@coreui/react";
import { DeleteHoliday } from "src/lib/api/manager/holiday/HolidayAPI";
import { useDispatch, useSelector } from "react-redux";
import { holidayAxios } from "src/modules/manager/holiday";

import "antd/dist/antd.css";
import { Button } from "antd";

// 국가공휴일 담는 js파일
import holidaydata from "./HolidayData";

function ShowCalendar() {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(0);
  const [visibleYN, setVisibleYN] = useState(1);
  const [alertContents, setAlertContents] = useState();
  const [alertYesNo, setAlertYesNo] = useState();

  const { holiday } = useSelector((state) => {
    return {
      holiday: state.holiday.holiday,
    };
  });

  useEffect(() => {
    dispatch(holidayAxios());
  }, [dispatch]);

  const eventOnClick = async (e) => {
    if (e.event._def["publicId"] > 0) {
      if (window.confirm != 0) {
        setAlertYesNo("test");
        // holiday_index를 가져옴
        // await DeleteHoliday(e.event._def["publicId"]);
        // await dispatch(holidayAxios());
        // 자동 rendering
      } else {
        console.log("삭제취소");
      }
    } else {
      setVisible(3);
      setAlertContents("국가 공휴일은 삭제 할 수 없습니다");
    }
  };

  const data = holiday.map((item) => {
    return {
      id: item.holiday_INDEX,
      title: item.holiday_TITLE,
      start: item.holiday_DATE,
      annual: item.holiday_ANNUAL_REPEAT,
    };
  });

  return (
    <>
      <div style={{ textAlign: "center", margin: "0px 30px" }}>
        <CAlert color="danger" show fade onShowChange={setVisibleYN}>
          <>
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => {
                console.log("삭제눌림");
              }}
            >
              삭제
            </Button>
            <Button
              size="small"
              type="secondary"
              onClick={() => {
                console.log("취소눌림");
              }}
            >
              취소
            </Button>
          </>
        </CAlert>
      </div>
      <CCardBody>
        <FullCalendar
          contentHeight="475px"
          defaultView="dayGridMonth"
          plugins={[daygridPlugin]}
          eventSources={[data, holidaydata]}
          eventClick={eventOnClick}
          eventColor="orange"
          eventTextColor="white"
          eventDisplay="title"
        />
      </CCardBody>
      <div style={{ textAlign: "center", margin: "0px 300px" }}>
        <CAlert color="warning" show={visible} fade onShowChange={setVisible}>
          {alertContents}
        </CAlert>
      </div>
    </>
  );
}
export default ShowCalendar;
