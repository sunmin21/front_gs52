import React from "react";

import FullCalendar from "@fullcalendar/react"; 
import timegrid from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { modalCheck1, modalDate, modalTime } from 'src/modules/schedule/conf';

export function ConfRoom(props) {
	const handleDateClick = (arg) => { 
		console.log(moment(arg.dateStr).format('hh:mm'))
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		dispatch(modalDate(moment(arg.dateStr).format('YYYY/MM/DD')))
		dispatch(modalTime(moment(arg.dateStr).format('hh:mm')))
		dispatch(modalCheck1())
	  }

	  const dispatch = useDispatch();
	  const { conf_modal1, conf_date,conf_time } = useSelector((state) => {
		  return ({   
			conf_modal1: state.conf_check.conf_modal1,
			conf_date: state.conf_check.conf_date,
			conf_time: state.conf_check.conf_time
		  })
		});
	
  	return (
		<div>
			{console.log("ROOMMMMMMMMMMMM")}
			<FullCalendar
					plugins={[timegrid, interactionPlugin ]}
					dateClick={handleDateClick}
					weekends={false}
					width={50}
					events={[
						{ title: "event 1", date: "2021-06-22"},
						{ title: "event 1", date:"2021-06-23", start:'2021-06-22T10:30:00'},
						{ title: "event 2", date: "2019-04-02" },
					]}
		/> 
		</div>
  	);
}

export default ConfRoom;
