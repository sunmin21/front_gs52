import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import {
    CButton,
    CCard,
    CSwitch,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

const AddHoliday = () => {

    const tdStyle = {
        textAlign: "left",
        padding: "20px"
    }
    const [info, setInfo] = useState(false)
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    return (
        <CModalBody>
            <CButton color="info" onClick={() => setInfo(!info)} className="mr-1">추가</CButton>
            <CModal show={info} 
                onClose={() => setInfo(!info)}
                color="info">
                <CModalHeader closeButton>
                    <CModalTitle>공휴일 추가하기</CModalTitle>
                </CModalHeader>
                <table style={{textAlign: "center", margin:"auto"}}>
                    <tr>
                        <td style={tdStyle}>제목</td>
                        <td style={tdStyle}><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>날짜 설정</td>
                        <td style={tdStyle}><DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                                console.log(update)
                            }}
                            inline
                        /></td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>매년 반복 여부</td>
                        <td style={tdStyle}><CSwitch className={'mx-1'} variant={'3d'} color={'info'} default /></td>
                    </tr>
                </table>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setInfo(!info)}>취소</CButton>
                    <CButton color="info" onClick={() => { console.log("확인눌림"); setInfo(!info) }}>확인</CButton>
                </CModalFooter>
            </CModal>
        </CModalBody>
    )
}

export default AddHoliday