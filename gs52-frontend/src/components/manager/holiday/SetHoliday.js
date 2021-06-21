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
    Cinput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CSelect,
    CFormGroup
} from '@coreui/react'
import { InsertHoliday } from 'src/lib/api/manager/holiday/HolidayAPI';

function AddHoliday() {

    const tdStyle = {
        textAlign: "left",
        padding: "20px"
    }
    const [info, setInfo] = useState(false)
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const selectTitle = [];
    const selectDate = [];
    const selectAnnual = [];

    const [primary, setPrimary] = useState(false);
    const [title, setTitle] = useState(selectTitle[0]);
    const [date, setDate] = useState(selectDate[0]);
    const [annual, setAnnual] = useState(selectAnnual[0]);

    const handleTitle = e => {
        setTitle(e.target.value);
    };
    const handleDate = e => {
        setDate(e.target.value);
    };
    const handleAnnual = e => {
        setAnnual(e.target.value);
    };
    const click = () => {
        InsertHoliday(title, date, annual);
        setPrimary(!primary);
    }
    
    return (
        <CModalBody>
            <CButton color="info" onClick={() => setInfo(!info)} className="mr-1">추가</CButton>
            <CModal show={info} 
                onClose={() => setInfo(!info)}
                color="info">
                <CModalHeader closeButton>
                    <CModalTitle>휴일 추가</CModalTitle>
                </CModalHeader>
                <CFormGroup>
                <table style={{textAlign: "center", margin:"auto"}}>
                    <tr>
                        <td style={tdStyle}>제목</td>
                        <td style={tdStyle}><input type="text"></input></td>
                        <td>
                            <div id="title" name="title" placeholder="제목을 입력하세요.">
                            
                        </div>
                        </td>
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
                    </CFormGroup>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setInfo(!info)}>취소</CButton>
                    <CButton color="info" onClick={() => { console.log("확인눌림"); setInfo(!info) }}>확인</CButton>
                </CModalFooter>
            </CModal>
        </CModalBody>
    )
}

export default AddHoliday