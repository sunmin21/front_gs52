import React, { useEffect, useState }from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/daygrid';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { DeleteHoliday } from 'src/lib/api/manager/holiday/HolidayAPI';
import HolidayList from './test';

function ShowCalendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("/holiday/showHoliday")
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

    const eventOnclick = (e) => {
        var msg = ("삭제하시겠습니까?");

        if (window.confirm(msg) != 0)
        {
            console.log("ㅇㅇ")
            console.log("show 창 : " + e.event._def["publicId"]) // holiday_index를 가져옴
            DeleteHoliday(e.event._def["publicId"]);
            // console.log("@@@@@@")
            // setEvents(DeleteHoliday(e.event._def["publicId"]))
            // window.location.reload(); // 자동 새로고침

        }
        else {
            console.log("ㄴㄴ")
        }
    }

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
                                    // plugins={[daygridPlugin]}
                                    plugins={[interaction]}
                                    events={events}
                                    // events={HolidayList}
                                    // events={[
                                    //     { title: 'event 1', date: '2021-06-01' },
                                    //     { title: 'event 2', date: '2021-06-02' }
                                    // ]}
                                    eventClick={eventOnclick}
                                    eventColor="light"
                                    eventTextColor="white"
                                    eventDisplay="title"
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