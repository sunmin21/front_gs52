import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { DeleteHoliday } from "src/lib/api/manager/holiday/HolidayAPI";
import { useDispatch, useSelector } from "react-redux";
import { holidayAxios } from "src/modules/manager/holiday";

import holidaydata from './HolidayData';

function ShowCalendar() {
  const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    const { holiday } = useSelector((state) => {
        // console.log("나 !!!!!!!!!!!!!!!!!")
        // console.log(state)
        return ({
            holiday : state.holiday.holiday
        })
    });

    useEffect(() => {
        dispatch(holidayAxios())
    }, [dispatch])

    const eventOnclick = (e) => {
        var msg = ("삭제하시겠습니까?");

        if(e.event._def["publicId"] > 0) {
            if (window.confirm(msg) != 0)
            {
                console.log("삭제")
                console.log(e.event._def)
                // holiday_index를 가져옴
                DeleteHoliday(e.event._def["publicId"]);
                dispatch(holidayAxios())
                // 자동 rendering
            }
            else {
                console.log("삭제취소")
            }
        }
        else {
            alert("국가 공휴일은 삭제할 수 없습니다.")
        }

    }
    // console.log(holiday)
    const data = holiday.map((item) => {
        return ({
            id: item.holiday_INDEX,
            title: item.holiday_TITLE,
            start: item.holiday_DATE,
            annual : item.holiday_ANNUAL_REPEAT
        })
    })

    return (
        <CCard>
            <CCardHeader>
                휴일 설정
            </CCardHeader>
            <CCardBody>
                <div className="calendarBox">
                <FullCalendar
                    // height="600px"
                    contentHeight="500px"
                    defaultView="dayGridMonth"
                    plugins={[daygridPlugin]}
                    eventSources = {[data, holidaydata]}
                    // events={data}
                    // events={holidaydata}
                    eventClick={eventOnclick}
                    eventColor="white"
                    eventTextColor="red"
                    eventDisplay="title"
                    />
                </div>
            </CCardBody>
        </CCard >
    )
}
export default ShowCalendar;
