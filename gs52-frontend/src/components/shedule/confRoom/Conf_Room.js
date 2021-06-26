import React, {useEffect} from "react";

import FullCalendar from "@fullcalendar/react"; 
import timegrid from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 
import moment from 'moment';

import { SelectConf } from "../../../lib/api/conf/ConfAPI";

import { useDispatch, useSelector } from 'react-redux';
import { ConfAxios, modalCheck1, modalDate, modalStartTime, modalEndTime } from 'src/modules/schedule/conf';

export function ConfRoom() {


	const dispatch = useDispatch();
	const { conf_list } = useSelector((state) => {
		//console.log(state)
		return ({   
			conf_list: state.conf_check.conf_list
		})
	});

	useEffect(() => {
        dispatch(ConfAxios())
    }, [dispatch])

	const data = conf_list.map((item) => ({
		conf_TITLE: item.conf_TITLE,
		conf_DATE: moment(item.conf_DATE).format("YYYY-MM-DD"),
		conf_START: item.conf_START,
		conf_END: item.conf_END,
		conf_ROOM_INDEX: item.conf_ROOM_INDEX,
		conf_EMP_INDEX_SEND: item.conf_EMP_INDEX_SEND,
	  }));

	const handleDateClick = (arg) => { 
		dispatch(modalDate(moment(arg.dateStr).format('YYYY/MM/DD')))
		dispatch(modalStartTime(moment(arg.dateStr).format('HH:mm')))
		dispatch(modalEndTime(moment(arg.dateStr).add(10,'m').format('HH:mm')))
		dispatch(modalCheck1())
		
		console.log(moment(arg.dateStr).format('hh:mm'))
		console.log(moment(arg.dateStr).add(10,'m').format('hh:mm'))
	  }

	

	
  	return (
		<div>
			{console.log("ROOMMMMMMMMMMMM")}
			{/* {console.log(data)} */}
			<FullCalendar
					plugins={[timegrid, interactionPlugin ]}
					dateClick={handleDateClick}
					weekends={false}
					width={50}
					events={[
						// { title: data[0].conf_TITLE, date:data[0].conf_DATE},
						// { title: data[1].conf_TITLE, date:data[1].conf_DATE, start:data[1].conf_START, end:data[1].conf_END},
						//'2021-06-22T15:30'

					]}
		/> 
		</div>
  	);
}

export default ConfRoom;
