import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormGroup, CTextarea, CAlert } from '@coreui/react'
import { useDispatch } from 'react-redux';
import { InsertReport } from 'src/lib/api/task/ReportAPI'
import { reportAxios, nextreportAxios } from 'src/modules/task/report';
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
function AddReport({ showAllReport }) {    

    const user = getCurrentUser();
    let [emp] = useState(user.index);

    const tdStyle = {
        textAlign: "left",
        padding: "20px"
    }
    const dispatch = useDispatch();
    
    useEffect(() => {
        
    }, [dispatch])

    const [info, setInfo] = useState(false);
    const [contents, setContents] = useState("");
    const [targetDate, setTargetDate] = useState();
    const [visible, setVisible] = useState(0);
    const [alertContents, setAlertContents] = useState();

    const handleContents = e => {
        setContents(e.target.value);
        console.log(contents)
    };
    
    const cancel = () => {
        console.log("취소했다!")
        setInfo(!info);
        // showAllReport()
    }

    const submit = () => {
        if (contents == "") {
            setVisible(3);
            setAlertContents("모두 입력해주세요");
        }
        else {
            console.log("@@@@추가@@@@")
            setInfo(!info);
            InsertReport(emp, contents, targetDate)
            dispatch(reportAxios())
            dispatch(nextreportAxios())
            showAllReport(targetDate);
            console.log(targetDate)
            
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
                                <td style={tdStyle}>내용</td>
                                <td style={tdStyle}>
                                    <CTextarea
                                        id="contents" name="contents" placeholder="주간 보고 내용"
                                        onChange={handleContents}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={tdStyle}>목표 날짜</td>
                                <td style={tdStyle}>
                                    <DatePicker
                                        selected={targetDate}
                                        onChange={setTargetDate}
                                        inline // 달력이 모달창에 뜨도록
                                        popperPlacement="auto" // 화면 중앙에 오도록
                                    />
                                </td>
                            </tr>
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

export default AddReport