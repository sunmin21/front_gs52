import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { CCard, CCardBody } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { calendarAxios } from "src/modules/main/Calendar";

function DetailCalendar() {

  const user = getCurrentUser();
  let [emp] = useState(user.index);
  
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const { mycalendar } = useSelector((state) => {
    console.log(state)
    return {
      mycalendar: state.myCalendar.calendar,
    }
  })

  // SelectCalendar(emp);

  useEffect(() => {
    dispatch(calendarAxios(emp));
  }, [dispatch])

  const data = mycalendar.map((item) => {
    return {
      title: item.attend_TYPE_NAME,
      start: item.attend_DATE
    }
  })

  return (
    <CCard>
      <CCardBody>
        <FullCalendar
          contentHeight="385px"
          defaultView="dayGridMonth"
          plugins={[daygridPlugin]}
          events={data}
          eventDisplay="title"
        />
      </CCardBody>
    </CCard>
  );
}
export default DetailCalendar;
