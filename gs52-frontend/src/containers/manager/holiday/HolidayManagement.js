import React, { useState } from 'react'
import AddHoliday from 'src/components/manager/holiday/SetHoliday';
import ShowCalendar from 'src/components/manager/holiday/ShowCalendar';

import { CCardBody, CCol, CRow } from '@coreui/react'

const HolidayManagement = () => {
    
    return (
        <CRow>
            <CCol>
                <CCardBody>
                    <ShowCalendar />
                    <AddHoliday />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default HolidayManagement