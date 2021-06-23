import React, { useState } from 'react'
import ShowCalendar from 'src/components/manager/holiday/ShowCalendar';
// import { HolidayAPI } from 'holidayapi';
import AddHoliday from 'src/components/manager/holiday/AddHoliday';

import { CCardBody, CCol, CRow } from '@coreui/react'

const HolidayManagement = () => {
    
    return (
        <CRow>
            <CCol>
                <CCardBody>
                    <AddHoliday />
                    <ShowCalendar />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default HolidayManagement