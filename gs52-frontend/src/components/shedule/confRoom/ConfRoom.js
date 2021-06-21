
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
const myEventsList = [
  { start: new Date(), end: new Date(), title: "special event" }
];
export function ConfRoom() {

  return (
    <div>
      {/* layout(부모)에서 데이터 가져옴.  */}
      {/* {console.log(props)} */}

      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width:1000 }}
      />

      {/* 부모 컴포넌트 데이터 전달 */}
      {/* {props.setData("sdf")} */}
    </div>
  );
}


export default ConfRoom;
