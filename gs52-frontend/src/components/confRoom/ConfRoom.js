
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
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ width: 500 }}
      />

    </div>
  );
}


export default ConfRoom;
