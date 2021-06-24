import React, { useState } from 'react'
import WeeklyReport from 'src/components/task/report/weeklyReport'

import { CCardBody, CCol, CRow } from '@coreui/react'

const HolidayManagement = () => {
    
    return (
        <CRow>
            <CCol>
                <CCardBody>
                    <WeeklyReport />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default HolidayManagement