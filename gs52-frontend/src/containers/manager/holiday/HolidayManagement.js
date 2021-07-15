import React from 'react'
import ShowCalendar from 'src/components/manager/holiday/ShowCalendar';
// import { HolidayAPI } from 'holidayapi';
import AddHoliday from 'src/components/manager/holiday/AddHoliday';

import { CCardBody, CCol, CRow } from '@coreui/react'

const HolidayManagement = () => {
    
    const contentStyle = {
        backgroundColor: "#3e4b54",
        width: "400px",
        textAlign: "center",
        boxShadow: "5px 5px 5px gray",
        padding: "8px",
        borderRadius: "50px",
    };
    
    return (
        <CRow>
            <CCol>
                <div style={contentStyle}>
                    <h4 style={{ color: "white", marginTop: "5px" }}>
                        휴일 관리
                    </h4>
                </div>
                <CCardBody>
                    <div style={{textAlign:"right"}}>
                        <AddHoliday />
                    </div>                    
                    <ShowCalendar />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default HolidayManagement