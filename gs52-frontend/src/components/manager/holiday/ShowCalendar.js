import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { CCard, CCardBody, CCardHeader, CAlert } from "@coreui/react";
import { DeleteHoliday } from "src/lib/api/manager/holiday/HolidayAPI";
import { useDispatch, useSelector } from "react-redux";
import { holidayAxios } from "src/modules/manager/holiday";

import styles from './ShowCalendar.module.css';///////////////////////////////////////////////////////////////
// 국가공휴일 담는 js파일
import holidaydata from "./HolidayData";
import { Alert } from 'antd';
import 'antd/dist/antd.css';

function ShowCalendar() {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const { holiday } = useSelector((state) => {
    return {
      holiday: state.holiday.holiday,
    };
  });

  useEffect(() => {
    dispatch(holidayAxios());
  }, [dispatch]);

  const eventOnclick = (e) => {
    var msg = "삭제하시겠습니까?";

    if (e.event._def["publicId"] > 0) {
      if (window.confirm(msg) != 0) {
        console.log("삭제");
        console.log(e.event._def);
        // holiday_index를 가져옴
        DeleteHoliday(e.event._def["publicId"]);
        dispatch(holidayAxios());
        // 자동 rendering
      } else {
        console.log("삭제취소");
      }
    } else {
      return (
        <Alert message="국가공휴일은 삭제할 수 없습니다" type="warning" showIcon closable />
      )
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
    <CCard>
      <CCardHeader>휴일 설정</CCardHeader>
      {/* ------------------------------------------------------------------------------------------- */}
      <CCardBody className={styles.a}> 
        <div className="calendarBox">
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
        </div>
        {/* <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          closable
        /> */}
      </CCardBody>
    </CCard>
  );
}
export default ShowCalendar;
