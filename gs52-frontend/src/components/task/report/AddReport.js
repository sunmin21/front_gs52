import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormGroup, CTextarea } from '@coreui/react'
import { reportAxios } from 'src/modules/task/report';
import { useDispatch } from 'react-redux';

function AddReport() {

    const tdStyle = {
        textAlign: "left",
        padding: "20px"
    }
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(reportAxios())
    }, [dispatch])

    const [info, setInfo] = useState(false);
    const [contents, setContents] = useState("");
    const [startDate, setStartDate] = useState();

    const handleContents = e => {
        setContents(e.target.value);
        console.log(contents)
    };
    
    const cancel = () => {
        console.log("취소했다!")
        setInfo(!info);
        // window.location.reload();
        // dispatch(holidayAxios());
        // 자동 rendering
    }

    const submit = () => {
        if (contents == "") {
            console.log("null이당")
            alert("주간 보고 내용을 입력해주세요 !")
        }
        else {
            
        }
    }
    
    return (
        <CModalBody>
            <CButton color="info" onClick={() => setInfo(!info)} className="mr-1">추가</CButton>
            <CModal show={info} 
                onClose={() => setInfo(!info)}
                color="info">
                <CModalHeader closeButton>
                    <CModalTitle>주간 보고 추가</CModalTitle>
                </CModalHeader>
                <CFormGroup>
                    <table style={{ textAlign: "center", margin: "auto" }}>
                        <tbody>
                            <tr>
                                <td style={tdStyle}>제목</td>
                                <td style={tdStyle}>
                                    <CTextarea
                                        id="contents" name="contents" placeholder="휴일"
                                        onChange={handleContents}
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
                        </tbody>
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

export default AddReport