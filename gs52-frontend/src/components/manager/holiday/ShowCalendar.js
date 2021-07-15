import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { CCard, CCardBody, CCardHeader, CAlert } from "@coreui/react";
import { DeleteHoliday } from "src/lib/api/manager/holiday/HolidayAPI";
import { useDispatch, useSelector } from "react-redux";
import { holidayAxios } from "src/modules/manager/holiday";

// 국가공휴일 담는 js파일
import holidaydata from "./HolidayData";

function ShowCalendar() {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(0);
  const [alertContents, setAlertContents] = useState();

  const { holiday } = useSelector((state) => {
    return {
      holiday: state.holiday.holiday,
    };
  });

  useEffect(() => {
    dispatch(holidayAxios());
  }, [dispatch]);

  const eventOnclick = async (e) => {
    var msg = "삭제하시겠습니까?";

    if (e.event._def["publicId"] > 0) {
      if (window.confirm(msg) != 0) {
        console.log("삭제");
        console.log(e.event._def);
        // holiday_index를 가져옴
        await DeleteHoliday(e.event._def["publicId"]);
        await dispatch(holidayAxios());
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
      <div style={{ textAlign: "center", margin: "10px 300px" }}>
        <CAlert color="warning" show={visible} fade onShowChange={setVisible}>
          {alertContents}
        </CAlert>
      </div>
      <CCard>
        <CCardBody>          
          <FullCalendar
            contentHeight="500px"
            defaultView="dayGridMonth"
            plugins={[daygridPlugin]}
            eventSources={[data, holidaydata]}
            eventClick={eventOnclick}
            eventColor="red"
            eventTextColor="white"
            eventDisplay="title"
          />
        </CCardBody>
      </CCard>
    </>
  );
}
export default ShowCalendar;
