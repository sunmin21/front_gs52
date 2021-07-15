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
  const [visibleYN, setVisibleYN] = useState(0);
  const [alertContents, setAlertContents] = useState();
  const [alertYesNo, setAlertYesNo] = useState();
  const [event, setEvent] = useState();

  const { holiday } = useSelector((state) => {
    return {
      holiday: state.holiday.holiday,
    };
  });

  useEffect(() => {
    dispatch(holidayAxios());
  }, [dispatch]);

  const data = holiday.map((item) => {
    return {
      id: item.holiday_INDEX,
      title: item.holiday_TITLE,
      start: item.holiday_DATE,
      annual: item.holiday_ANNUAL_REPEAT,
    };
  });

  const DeleteOnClick = async (e) => {
    await DeleteHoliday(e.event._def["publicId"]);
    await dispatch(holidayAxios());
    setVisibleYN(0)
  }

  const eventOnClick = async (e) => {
    if (e.event._def["publicId"] > 0) {
      setVisibleYN(true);
      setAlertYesNo("'" + e.event._def["title"] + "' 삭제하시겠습니까?")
      setEvent(e);
      
    } else {
      setVisible(3);
      setAlertContents("국가 공휴일은 삭제 할 수 없습니다");
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "0px 30px" }}>
        <CAlert color="danger" show={visibleYN} fade onShowChange={setVisibleYN}>
          {alertYesNo}
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
                setVisibleYN(0)
            }}
            style={{margin:"0px 0px 0px 5px"}}
            >
              취소
          </Button>
        </CAlert>
      </div>
      <CCardBody>
        <FullCalendar
          contentHeight="475px"
          defaultView="dayGridMonth"
          plugins={[daygridPlugin]}
          eventSources={[data, holidaydata]}
          eventClick={eventOnClick}
          eventColor="red"
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
