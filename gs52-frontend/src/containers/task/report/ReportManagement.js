import React from 'react'
import { CCardBody, CCol, CRow } from '@coreui/react'
import CheckOthers from 'src/components/task/report/CheckOthers'
import WeeklyReport from 'src/components/task/report/WeeklyReport'

const HolidayManagement = () => {
    
    return (
        <CRow>
            <CCol>
                <CCardBody>
                    <CheckOthers />
                    <WeeklyReport />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default HolidayManagement