import React from 'react'
import { CRow, CCol, CCardGroup, CCardBody  } from '@coreui/react'
import CheckOthers from 'src/components/task/report/CheckOthers'
import WeeklyReport from 'src/components/task/report/WeeklyReport'

const HolidayManagement = () => {
    
    return (
        <CRow>
            <CCol>
                <CCardBody>
                    <CheckOthers/>
                </CCardBody>
                <CCardBody>
                    <WeeklyReport />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default HolidayManagement