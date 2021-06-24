import React, {useState} from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';

function WeeklyReport() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <CCard>
            <CCardHeader>
                주간 보고서
            </CCardHeader>
            <CCardBody>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    // inline // 달력이 모달창에 뜨도록
                    // minDate={new Date()} // 이전 날은 선택 못하도록
                    popperPlacement="auto" // 화면 중앙에 오도록
                />
            </CCardBody>
        </CCard >
    )
}

export default WeeklyReport;