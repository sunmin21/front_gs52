import React from "react";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export function ConfRoom(props) {
	const handleDateClick = (arg) => { // bind with an arrow function
		props.setDate(arg.dateStr);
			alert(arg.dateStr);
		
	  }

  return (
    <div>
      {/* layout(부모)에서 데이터 가져옴.  */}
      {/* {console.log(props)} */}

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin ]}
		dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: "event 1", date: "2021-06-22" },
          { title: "event 2", date: "2019-04-02" },
        ]}
      />

      {/* 부모 컴포넌트 데이터 전달 */}
      {/* {props.setData("sdf")} */}
    </div>
  );
}

export default ConfRoom;
