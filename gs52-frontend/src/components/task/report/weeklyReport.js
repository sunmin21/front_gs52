import React, { useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CCard, CCardBody, CCardHeader, CCardGroup, CCardText } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { holidayAxios } from 'src/modules/task/report';

function WeeklyReport() {
    
    const dispatch = useDispatch();
    const { report } = useSelector((state) => {
        // console.log("나 !!!!!!!!!!!!!!!!!")
        // console.log(state)
        return ({   
            report : state.report.report            
        })
    });

    useEffect(() => {
        dispatch(holidayAxios())
    }, [dispatch])

    const tdDate = {
        color: "red",
        width: "100px",
        padding: "20px 30px",
        textAlign : "center"
    }

    const tdContents = {
        width: "500px",
        padding: "20px 30px",
        textAlign : "center"
    }

    const [startDate, setStartDate] = useState();

    var moment = require('moment');
    var weekStart = moment(startDate).day(0).format("YYYY년 MM월 DD일");
    var weekEnd = moment(startDate).day(6).format("YYYY년 MM월 DD일");

    const data = report.map((item) => {
        return ({
            id: item.report_index,
            contents: item.report_contents,
            target : item.report_target_date
        })
    })

    return (
        <CCard>
            <CCardHeader>
                주간 보고서
            </CCardHeader>
            <CCardGroup>
                <CCardBody>
                    원하는 일자를 선택하세요 <br />
                    <DatePicker
                        selected={startDate}
                        onChange={(weekStart) => setStartDate(weekStart)}
                    />
                </CCardBody>
                <CCardBody>
                    선택된 주 <h4>{weekStart + " - " + weekEnd}</h4>
                </CCardBody>
            </CCardGroup>
            <hr></hr>
            <CCardGroup>
                <CCardText>Todolist position</CCardText>
                    <CCardBody>
                        todolist 1
                        <table border={"1"}>
                            <tr>
                                <td style={tdDate}>날짜</td>
                                <td style={tdContents}>보고내용</td>
                            </tr>
                            <tr>
                            <td></td>
                            <td></td>
                            </tr>                            
                        </table>
                    </CCardBody>
                    <CCardBody>
                        todolist 2
                        {/* <table border={"1"}>
                            <tr>
                                <td style={tdDate}>날짜</td>
                                <td style={tdContents}>보고내용</td>
                            </tr>
                        </table> */}
                    </CCardBody>
            </CCardGroup>
            
        </CCard >
    )
}

export default WeeklyReport;