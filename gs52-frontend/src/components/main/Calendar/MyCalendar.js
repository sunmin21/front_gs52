import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { CCard, CCardBody } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import {
  calendarAxios,
  calendarAxios2,
  calendarAxios3,
} from "src/modules/main/Calendar";
// 휴일
import holidaydata from "src/components/manager/holiday/HolidayData";
import { holidayAxios } from "src/modules/manager/holiday";

function MyCalendar() {
  const user = getCurrentUser();
  let [emp] = useState(user.index);

  var moment = require("moment");

  const dispatch = useDispatch();
  const { mycalendar } = useSelector((state) => {
    return {
      mycalendar: state.myCalendar.calendar,
    };
  });

  const { mycalendar2 } = useSelector((state) => {
    return {
      mycalendar2: state.myCalendar.calendar2,
    };
  });

  const { mycalendar3 } = useSelector((state) => {
    return {
      mycalendar3: state.myCalendar.calendar3,
    };
  });

  const { holiday } = useSelector((state) => {
    return {
      holiday: state.holiday.holiday,
    };
  });

  useEffect(() => {
    dispatch(calendarAxios(emp));
    dispatch(calendarAxios2(emp));
    dispatch(calendarAxios3(emp));
    dispatch(holidayAxios());
  }, [dispatch]);

  const data = mycalendar.map((item) => {
    if (item.attend_TYPE_NAME == "연차" || item.attend_TYPE_NAME == "반차") {
      return {
        title: item.attend_TYPE_NAME,
        start: item.attend_DATE,
        color: "#2e88ff",
      };
    } else if (
      item.attend_TYPE_NAME == "출장" ||
      item.attend_TYPE_NAME == "외근"
    ) {
      return {
        title: item.attend_TYPE_NAME,
        start: item.attend_DATE,
        color: "orange",
      };
    } else {
      return {
        title: item.attend_TYPE_NAME,
        start: item.attend_DATE,
        color: "black",
      };
    }
  });

  const data2 = mycalendar2.map((item2) => {
    return {
      title: item2.conf_TITLE,
      start: item2.conf_DATE,
      color: "#a45cf7",
    };
  });

  const data3 = mycalendar3.map((item3) => {
    return {
      title: item3.conf_TITLE,
      start: item3.conf_DATE,
      color: "#a45cf7",
    };
  });

  const data4 = holiday.map((item4) => {
    return {
      title: item4.holiday_TITLE,
      start: item4.holiday_DATE,
      color: "#ff4747",
    };
  });

  return (
    <CCard>
      <CCardBody>
        <div className="calendarBox">
          <FullCalendar
            contentHeight="385px"
            plugins={[daygridPlugin]}
            defaultView="dayGridMonth"
            eventSources={[data, data2, data3, data4, holidaydata]}
            eventColor="#ff4747"
            eventTextColor="white"
            eventDisplay="title"
          />
        </div>
      </CCardBody>
    </CCard>
  );
}
export default MyCalendar;
