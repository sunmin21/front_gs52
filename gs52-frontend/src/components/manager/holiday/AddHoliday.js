import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CButton, CSwitch, CInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormGroup, CAlert } from '@coreui/react'
import { InsertHoliday } from 'src/lib/api/manager/holiday/HolidayAPI';
import { holidayAxios } from 'src/modules/manager/holiday';
import { useDispatch } from 'react-redux';

function AddHoliday() {

    const tdStyle = {
        textAlign: "left",
        padding: "20px"
    }

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(holidayAxios())
    }, [dispatch])

    const [flag, setFlag] = useState(false);
    const [info, setInfo] = useState(false);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState();
    let [annual] = useState(0);

    const [visible, setVisible] = useState(0);
    const [alertContents, setAlertContents] = useState();

    const handleTitle = e => {
        setTitle(e.target.value);
    };

    const handleAnnual = e => {
        
        if (flag == false) {
            console.log("on");
            annual = 1;
        }
        else
            console.log("off");
    };
    console.log("flag : " + flag)

    const cancel = () => {
        console.log("취소했다!")
        setInfo(!info);
        dispatch(holidayAxios());
        // 자동 rendering
        setFlag(false)
    }

    const submit = () => {
        if (title == "") {
            setVisible(3);
            setAlertContents("모두 입력해주세요");
        }
        else {
            console.log(flag)
            if (flag == true) {
                InsertHoliday(title, startDate, annual);
                startDate.setYear(startDate.getFullYear() + 1)
                InsertHoliday(title, startDate, annual);
                startDate.setYear(startDate.getFullYear()-1)
            }
            else if (flag == false) {
                InsertHoliday(title, startDate, annual);
            }
            console.log("등록성공")
            setInfo(!info);
            dispatch(holidayAxios());
            setFlag(false)
            // 자동 rendering
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
                    <table style={{ textAlign: "center", margin: "auto" }}>
                        <tbody>
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
                                        minDate={new Date()} // 이전 날은 선택 못하도록
                                        popperPlacement="auto" // 화면 중앙에 오도록
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={tdStyle} rowSpan="2">반복 설정</td>
                                {/* <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" /> */}
                                <td style={tdStyle}>
                                    <CSwitch
                                        className={'mx-1'} variant={'3d'} color={'info'}
                                        onChange={handleAnnual}
                                        onClick={() => {setFlag(!flag)}}
                                        checked={flag}
                                    />
                                </td>
                            </tr>
                            <tr><td>이 설정은 내년에도 반복됩니다</td></tr>
                        </tbody>
                    </table>
                    <CModalBody style={{textAlign:"center", margin:"10px 20px -20px 20px"}}>
                        <CAlert color="warning" show={visible} fade onShowChange={setVisible}>
                            {alertContents}
                        </CAlert>
                    </CModalBody>                    
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