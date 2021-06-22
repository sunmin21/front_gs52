import React, { useEffect, useState }from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import Colors from 'src/views/theme/colors/Colors';

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

    return (
        <div>
            <CCard>
                <CCardHeader>
                    휴일 설정
                </CCardHeader>
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
            </CCard>
        </div>        
    )
}
export default ShowCalendar;