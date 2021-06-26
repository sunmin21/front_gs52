import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CCard, CCardBody, CCardHeader, CCardGroup, CCardText, CDataTable, CBadge } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { reportAxios } from 'src/modules/task/report';

function WeeklyReport() {

    let [emp] = useState(1);
    const dispatch = useDispatch();

    const { report } = useSelector((state) => {
        console.log("나 !!!!!!!!!!!!!!!!!")
        console.log(state)
        return ({   
            report : state.report.report            
        })
    });

    useEffect(() => {
        dispatch(reportAxios())
    }, [dispatch])

    const fields = ['contents','date']

    // ---- 날짜 선택하면 해당되는 일주일을 보여줌 ----//
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
    // --------------------------------------------//

    const data = report.map((item) => {
        return ({
            id: item.report_INDEX,
            emp : item.report_EMP_INDEX,
            contents: item.report_CONTENTS,
            date: item.report_TARGET_DATE,
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
                <CCardBody>
                    <CDataTable
                        fields={fields}
                        items={data}
                        itemsPerPage={5}
                        pagination
                    />
                </CCardBody>
                <CCardBody>
                    <CDataTable
                        fields={fields}
                        items={data}
                        itemsPerPage={5}
                        pagination
                    />
                </CCardBody>
            </CCardGroup>
        </CCard >
    )
}

export default WeeklyReport;