import React from "react";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timegrid from "@fullcalendar/timegrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


export function ConfRoom(props) {
	const handleDateClick = (arg) => { // bind with an arrow function
		//props.setTime(arg.dateStr);
		//props.setConf_Click(true);
      
	  }

  return (
    <div>
	{console.log("ROOMMMMMMMMMMMM")}
      {/* layout(부모)에서 데이터 가져옴.  */}
      {/* {console.log(props)} */}
		<FullCalendar
				plugins={[timegrid, interactionPlugin ]}
				// dateClick={handleDateClick}
				weekends={false}
				width={50}
				events={[
					{ title: "event 1", date: "2021-06-22"},
					{ title: "event 1", date:"2021-06-23", start:'2021-06-22T10:30:00'},
					{ title: "event 2", date: "2019-04-02" },
				]}
      /> 

      {/* 부모 컴포넌트 데이터 전달 */}
      {/* {props.setData("sdf")} */}
    </div>
  );
}

export default ConfRoom;
