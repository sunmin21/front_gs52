import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';

import {
    CCard,
    CCardBody,
    CCardHeader,
} from '@coreui/react'

class ShowCalendar extends Component {
    
    constructor(props) {
        super(props);
    }
    render() {
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
                                    <FullCalendar defaultView="dayGridMonth" plugins={[daygridPlugin]}
                                        weekends={false} events={[
                                            {title : 'test', date: '2021-05-24'}]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> 
                </CCardBody>
            </CCard>
        )
    }    
}

export default ShowCalendar