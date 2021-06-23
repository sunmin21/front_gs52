import React, { useEffect, useState }from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/daygrid';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { DeleteHoliday } from 'src/lib/api/manager/holiday/HolidayAPI';
import { useDispatch, useSelector } from 'react-redux';
import { holidayAxios } from 'src/modules/manager/holiday';

function ShowCalendar() {

    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    const { holiday } = useSelector((state) => {
        return ({   
            holiday: state.holiday.holiday,
        })
    });

    // useEffect(() => {
    //     fetch("/holiday/showHoliday")
    //         .then((response) => response.json())
    //         .then((events) => {     
    //             setEvents(events.map((event) => {
    //                 return ({
    //                     id: event.holiday_INDEX,
    //                     title: event.holiday_TITLE,
    //                     start: event.holiday_DATE,
    //                 })
    //             }))
    //         })
    // }, [])

    useEffect(() => {
        dispatch(holidayAxios())
    }, [dispatch])

    console.log(holiday)
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
    const data =holiday.map((item) => {
        return ({
            id: item.holiday_INDEX,
            title: item.holiday_TITLE,
            start: item.holiday_DATE,
        })
    })
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
                                    events={data}
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