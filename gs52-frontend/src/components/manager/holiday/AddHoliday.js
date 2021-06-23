import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import {
    CButton,
    CSwitch,
    CInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormGroup
} from '@coreui/react'
import { InsertHoliday } from 'src/lib/api/manager/holiday/HolidayAPI';
import { enableCursor } from '@fullcalendar/common';

function AddHoliday() {

    const tdStyle = {
        textAlign: "left",
        padding: "20px"
    }

    const selectAnnual = [];
    let changed = 0;
    const [info, setInfo] = useState(false);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState();
    const [annual, setAnnual] = useState(1);

    const handleTitle = e => {
        setTitle(e.target.value);
        console.log(title)
    };

    const handleAnnual = e => {
        changed++;
        console.log(changed)
        if (changed%2==1 ) {
            console.log("on");
            alert("이 설정은 내년에도 적용됩니다 !")
            changed = 1;
        }
        else
            console.log("off");
    };
    
    const cancel = () => {
        console.log("취소했다!")
        setInfo(!info);
        window.location.reload();
    }

    const submit = () => {
        if (title == "") {
            console.log("null이당")
            alert("휴일명을 입력해주세요 !")
        }
        else {
            if (changed == 1) {
                console.log(startDate)
                // startDate = startDate
            }
            console.log(title, startDate, annual)
            InsertHoliday(title, startDate, annual);
            setInfo(!info);
            // window.location.reload(); // 자동 새로고침
        }
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
                        <td style={tdStyle}>
                            <CInput
                                id="title" name="title" placeholder="휴일"
                                onChange={handleTitle}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>날짜 설정</td>
                        <td style={tdStyle}>
                            <DatePicker
                                selected={startDate}
                                onChange={setStartDate}
                                inline // 달력이 모달창에 뜨도록
                                // minDate={new Date()} // 이전 날은 선택 못하도록
                                popperPlacement="auto" // 화면 중앙에 오도록
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>매년 반복 여부</td>
                        <td style={tdStyle}>
                                <CSwitch
                                    className={'mx-1'} variant={'3d'} color={'info'}
                                    onChange={handleAnnual}
                                defaultChecked={false}
                            />
                        </td>
                    </tr>
                    </table>
                    </CFormGroup>
                <CModalFooter>
                    <CButton color="secondary" onClick={cancel}>취소</CButton>
                    <CButton color="info" onClick={submit}>확인</CButton>
                </CModalFooter>
            </CModal>
        </CModalBody>
    )
}

export default AddHoliday