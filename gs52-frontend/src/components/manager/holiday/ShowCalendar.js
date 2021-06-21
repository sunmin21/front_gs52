import React, { useEffect, useState }from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import HolidayList from './HolidayApi.js';
import axios from "axios";
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { render } from '@testing-library/react';

function ShowCalendar() {
    
    // const [event, setEvent] = useState({ hits: [] });
    // useEffect(async () => {
    //     const getHolidayEvents = await axios.get('/history/h');
    //     setEvent(getHolidayEvents.event);
    //     console.log(getHolidayEvents.event);
    // }, []);
    // state = {
    //     data: []
    // };

    // useEffect(async () => {
    //     await axios.get("/holiday/h").then((data) => {
    //         console.log("@@E웅야야!!!")
    //     })
    // }

    return (
        <CCard>
            <CCardHeader>
                휴일 설정
            </CCardHeader>
            <CCardBody>
                <div style={{backgroundColor:"coral"}}>
                    here is components
                    {/* {JSON.stringify(this.state.data)} */}
                </div>
                <div className="mypage-body">
                    <div className="body-wrapper box">
                        <div className="body-info-container">
                            <div className="calendar-wrapper">
                                <FullCalendar defaultView="dayGridMonth"
                                    plugins={[daygridPlugin]}
                                    events={HolidayList}
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