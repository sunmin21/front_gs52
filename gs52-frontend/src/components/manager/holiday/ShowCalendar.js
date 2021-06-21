import React from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import axios from "axios";
import events from './Holidays.json';

import { CCard, CCardBody, CCardHeader, } from '@coreui/react'

function ShowCalendar() {

    return (
        <CCard>
            <CCardHeader>
                휴일 설정
            </CCardHeader>
            <CCardBody>
                <div style={{backgroundColor:"coral"}}>
                    here is components
                </div>
                <div className="mypage-body">
                    <div className="body-wrapper box">
                        <div className="body-info-container">
                            <div className="calendar-wrapper">
                                <FullCalendar defaultView="dayGridMonth"
                                    plugins={[daygridPlugin]}
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