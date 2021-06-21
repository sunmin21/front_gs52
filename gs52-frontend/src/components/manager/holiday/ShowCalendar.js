import React, { useEffect, useState }from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import HolidayList from './HolidayApi.js';
import axios from "axios";
import { CCard, CCardBody, CCardHeader } from '@coreui/react';

function ShowCalendar() {

    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch("/holiday/h")
            .then((response) => response.json())
            .then((events) => {
                
                setEvents(events.map((event) => {
                    return ({
                        id: event.holiday_INDEX,
                        title: event.holiday_TITLE,
                        start: event.holiday_DATE,
                    })
                }))
                
            })
    }, [])
   console.log("몇번")
    return (
        <CCard>
            <CCardHeader>
                휴일 설정
            </CCardHeader>
            <CCardBody>
                <div style={{backgroundColor:"coral"}}>
                    here is components
                    {
                    // setContents((content) => {
                    //     events.map((event) => {
                    //         return (content.concat({
                    //             id: event.holiday_INDEX,
                    //             title: event.holiday_TITLE,
                    //             start: event.holiday_DATE,
                    //         }))
                    //     })
                    // }
                    // return(<li key = { event.holiday_TITLE } > { event.holiday_TITLE }</li>)
                    // console.log(event)
                    }
                </div>
                <div className="mypage-body">
                    <div className="body-wrapper box">
                        <div className="body-info-container">
                            <div className="calendar-wrapper">
                                <FullCalendar
                                    defaultView="dayGridMonth"
                                    plugins={[daygridPlugin]}
                                    events={events}
                                />
                            </div>
                        </div>
                    </div>
                </div> 
            </CCardBody>
        </CCard>
    )
}
export default ShowCalendar;