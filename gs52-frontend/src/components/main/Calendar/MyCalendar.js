import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { CCard, CCardBody } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { calendarAxios, calendarAxios2, calendarAxios3 } from "src/modules/main/Calendar";

function DetailCalendar() {

  const user = getCurrentUser();
  let [emp] = useState(user.index);
  
  const dispatch = useDispatch();

  const { mycalendar } = useSelector((state) => {
    return {
      mycalendar: state.myCalendar.calendar,
    }
  })

  const { mycalendar2 } = useSelector((state) => {
    console.log(state)
    return {
      mycalendar2: state.myCalendar.calendar2,
    }
  })

  const { mycalendar3 } = useSelector((state) => {
    return {
      mycalendar3: state.myCalendar.calendar3,
    }
  })
  
  useEffect(() => {
    dispatch(calendarAxios(emp));
    dispatch(calendarAxios2(emp));
    dispatch(calendarAxios3(emp));
  }, [dispatch])

  const data = mycalendar.map((item) => {
    return {
      title: item.attend_TYPE_NAME,
      start: item.attend_DATE
    }
  })

  const data2 = mycalendar2.map((item2) => {
    return {     
      title: item2.conf_TITLE,
      start: item2.conf_DATE + " " + item2.conf_START,
    }
  })

  const data3 = mycalendar3.map((item3) => {
    return {     
      title: item3.conf_TITLE,
      start: item3.conf_DATE + " " + item3.conf_START,
    }
  })
  
  return (
    <CCard>
      <CCardBody>
        <FullCalendar
          contentHeight="385px"
          defaultView="dayGridMonth"
          plugins={[daygridPlugin]}
          // events={data2}
          eventSources={[data, data2, data3]}
          eventDisplay="title"
        />
      </CCardBody>
    </CCard>
  );
}
export default DetailCalendar;
