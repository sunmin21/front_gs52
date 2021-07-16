import React, {useEffect} from "react";

import FullCalendar from "@fullcalendar/react"; 
import timegrid from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { ConfOneAxios, modalCheck1,modalCheck2, modalDate, modalStartTime, modalEndTime } from 'src/modules/schedule/conf';

export function ConfRoom(props) {

	const dispatch = useDispatch();
	const { conf_list,conf_modal1 } = useSelector((state) => {
		//console.log(state)
		return ({   
			conf_list: state.conf_check.conf_list,
			conf_modal1: state.conf_check.conf_modal1,
		})
	});

	useEffect(()=>{
		console.log("rendering")
	},[conf_list])

	const handleDateClick = async(arg) => { 
		await dispatch(modalDate(moment(arg.dateStr).format('YYYY-MM-DD')))
		await dispatch(modalStartTime(moment(arg.dateStr).format('HH:mm')))
		await dispatch(modalEndTime(moment(arg.dateStr).add(30,'m').format('HH:mm')))
		await dispatch(ConfOneAxios('1'))
		await dispatch(modalCheck1())
	  }

	  const data = conf_list.map((item) => {
		  if(  moment(item.conf_DATE).format("YYYY-MM-DD")+"T"+item.conf_END < moment().format("YYYY-MM-DD")){
			  var color = "navy"
		  }
		  else{
			var color = "purple"
		  }
        return{
		id: item.conf_INDEX,
		title: item.conf_TITLE,
		date: moment(item.conf_DATE).format("YYYY-MM-DD"),
		start: moment(item.conf_DATE).format("YYYY-MM-DD")+"T"+item.conf_START,
		end: moment(item.conf_DATE).format("YYYY-MM-DD")+"T"+item.conf_END,
						// //'2021-06-22T15:30'	
		
		color:color
    }
	  }
      );

	  const eventOnclick = async (e) => {
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		console.log(e.event._def.publicId)
		await dispatch(ConfOneAxios(e.event._def.publicId))
		await dispatch(modalCheck2())
	  };

  	return (
		<div>
			{console.log("ROOMMMMMMMMMMMM")}
			<FullCalendar
					plugins={[timegrid, interactionPlugin ]}
					dateClick={handleDateClick}
					eventClick={eventOnclick}
					weekends={false}
					width={50}
					slotEventOverlap={false}
					eventSources={[data	
					]}
		/> 
		</div>
  	);
}

export default ConfRoom;
