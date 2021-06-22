import React, { useEffect, useState }from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';

function ShowCalendar() {

    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch("/holiday/showHoliday")
            .then((response) => response.json())
            .then((events) => {     
                setEvents(events.map((event) => {
                    // console.log(event)
                    return ({
                        id: event.holiday_INDEX,
                        title: event.holiday_TITLE,
                        start: event.holiday_DATE,
                    })
                }))
            })
    }, [])

    return (
        <CCard>
            <CCardHeader>
                휴일 설정
            </CCardHeader>
            {/* {console.log(events)} */}
            <CCardBody>
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
        </CCard >
    )
}
export default ShowCalendar;