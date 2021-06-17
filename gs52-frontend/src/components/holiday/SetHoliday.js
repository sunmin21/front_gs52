import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import './SetHoliday.css';
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

const Modals = () => {
    const [info, setInfo] = useState(false)
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        공휴일 설정하기
                    </CCardHeader>
                    <CCardBody>
                        달력자리
                    </CCardBody>
                    <CCardBody>
                        <CButton color="info" onClick={() => setInfo(!info)} className="mr-1">추가</CButton>
                        <CModal show={info} 
                            onClose={() => setInfo(!info)}
                            color="info">
                            <CModalHeader closeButton>
                                <CModalTitle>공휴일 추가하기</CModalTitle>
                            </CModalHeader>
                            <table className="calTable">
                                <tr><td>제목</td>
                                    <td><input type="text"></input></td>
                                </tr>
                                <tr><td>날짜 설정</td>
                                    <td><DatePicker
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={(update) => {
                                            setDateRange(update);
                                            console.log(update)
                                        }}
                                        inline
                                    />
                                    </td>
                                </tr>
                                <tr><td>매년 반복 여부</td><td><CSwitch className={'mx-1'} variant={'3d'} color={'info'} default /></td></tr>
                            </table>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setInfo(!info)}>취소</CButton>
                                <CButton color="info" onClick={() => console.log("dz")}>확인</CButton>
                            </CModalFooter>
                        </CModal>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Modals