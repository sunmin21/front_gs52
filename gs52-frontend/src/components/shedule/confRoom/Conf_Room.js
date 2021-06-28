import React, {useEffect} from "react";

import FullCalendar from "@fullcalendar/react"; 
import timegrid from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 
import moment from 'moment';

import { SelectConf } from "../../../lib/api/conf/ConfAPI";

import { useDispatch, useSelector } from 'react-redux';
import { ConfAxios, modalCheck1, modalDate, modalStartTime, modalEndTime } from 'src/modules/schedule/conf';

export function ConfRoom(props) {


	const dispatch = useDispatch();
	const { conf_list } = useSelector((state) => {
		//console.log(state)
		return ({   
			conf_list: state.conf_check.conf_list
		})
	});

	// useEffect(() => {
    //     dispatch(ConfAxios())
    // }, [dispatch])

	// const data = conf_list.map((item) => ({
	// 	id: item.conf_INDEX,
	// 	title: item.conf_TITLE,
	// 	date: moment(item.conf_DATE).format("YYYY-MM-DD"),
	// 	start: item.conf_START,
	// 	end: item.conf_END,
	// 	conf_ROOM_INDEX: item.conf_ROOM_INDEX,
	// 	conf_EMP_INDEX_SEND: item.conf_EMP_INDEX_SEND,
	//   }));

	const handleDateClick = (arg) => { 
		dispatch(modalDate(moment(arg.dateStr).format('YYYY/MM/DD')))
		dispatch(modalStartTime(moment(arg.dateStr).format('HH:mm')))
		dispatch(modalEndTime(moment(arg.dateStr).add(10,'m').format('HH:mm')))
		dispatch(modalCheck1())
	  }

	//렌더링만 조절하면 데이터 다 받아와지는데.......
	{console.log("conf_list")}
	{console.log(conf_list)}
  	return (
		<div>
			{console.log("ROOMMMMMMMMMMMM")}
			<FullCalendar
					plugins={[timegrid, interactionPlugin ]}
					dateClick={handleDateClick}
					weekends={false}
					width={50}
					//eventSources={[data]}
					events={[
						{ title: 'event 1', date: '2021-06-28' },
						//{ title: props.data[0].title, date:props.data[0].date},
						 //{ title: data[0].title, date:data[0].date, start:data[0].start, end:data[0].end},
						//'2021-06-22T15:30'

					]}
		/> 
		</div>
  	);
}

export default ConfRoom;
