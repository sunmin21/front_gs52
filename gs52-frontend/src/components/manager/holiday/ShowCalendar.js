import React, { useState } from 'react'

import {
    CCard,
    CCardBody,
    CCardHeader,
} from '@coreui/react'

const ShowCalendar = () => {
    const [info, setInfo] = useState(false)
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    return (
        <CCard>
            <CCardHeader>
                공휴일 설정하기
            </CCardHeader>
            <CCardBody>
                달력자리
            </CCardBody>
        </CCard>
    )
}

export default ShowCalendar