import React, { useEffect }from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { DeleteHoliday } from 'src/lib/api/manager/holiday/HolidayAPI';
import { useDispatch, useSelector } from 'react-redux';
import { holidayAxios } from 'src/modules/manager/holiday';

import holidaydata from './HolidayData';

function ShowCalendar() {

    const dispatch = useDispatch();
    const { holiday } = useSelector((state) => {

        return ({   
            holiday : state.holiday.holiday            
        })
    });

    useEffect(() => {
        dispatch(holidayAxios())
    }, [dispatch])
    
    const eventOnclick = (e) => {
        var msg = ("삭제하시겠습니까?");

        if (window.confirm(msg) != 0)
        {
            console.log("ㅇㅇ")
            console.log("show 창 : " + e.event._def["publicId"])
            // holiday_index를 가져옴
            DeleteHoliday(e.event._def["publicId"]);
            dispatch(holidayAxios())
            // 자동 rendering
        }
        else {
            console.log("ㄴㄴ")
        }
    }
    const data = holiday.map((item) => {
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
            <CCardBody>
                <div className="mypage-body">
                    <div className="body-wrapper box">
                        <div className="body-info-container">
                            <div className="calendar-wrapper">
                                <FullCalendar
                                    defaultView="dayGridMonth"
                                    plugins={[daygridPlugin]}
                                    eventSources = {[data, holidaydata]}
                                    // events={data}
                                    // events={holidaydata}
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