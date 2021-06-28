import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CCard, CCardBody, CCardHeader, CCardGroup, CDataTable } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { reportAxios } from 'src/modules/task/report';
import AddReport from "./AddReport";

function WeeklyReport() {

    let [emp] = useState(1);
    const dispatch = useDispatch();

    const { report } = useSelector((state) => {
        return {
            report: state.report.report
        };
    });

    useEffect(() => {
        // dispatch(reportAxios(emp, weekStart, weekEnd))
    }, [dispatch])

    const fields = ['contents','date']

    // ---- 날짜 선택하면 해당되는 일주일을 보여줌 ----//

    const [startDate, setStartDate] = useState();

    var moment = require('moment');
    var weekStart = moment(startDate).day(0).format("YYYY-MM-DD");
    var weekEnd = moment(startDate).day(6).format("YYYY-MM-DD");

    // --------------------------------------------//

    const data = report.map((item) => {
        // console.log("!!!!!!!!!!!!!!!!!!!!")
        // console.log(item)
        return ({
            id: item.report_INDEX,
            emp : item.report_EMP_INDEX,
            contents: item.report_CONTENTS,
            date: item.report_TARGET_DATE,
        })
    })

    const data2 = report.map((item2) => {
        // console.log("@@@@@@@@@@@@@@@")
        // console.log(item2)
        return ({
            id: item2.report_INDEX,
            emp : item2.report_EMP_INDEX,
            contents: item2.report_CONTENTS,
            date: item2.report_TARGET_DATE,
        })
    })

    const showReport = (weekStart) => {
        console.log("@@@ this is show report zone @@@")
        console.log(weekStart)
        console.log(weekEnd)
        setStartDate(weekStart)
        return (dispatch(reportAxios({ emp, weekStart: moment(weekStart).day(0).format("YYYY-MM-DD"), weekEnd: moment(weekStart).day(6).format("YYYY-MM-DD") })))
    }

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
                        onChange={(date)=>{showReport(date)}}
                    />
                </CCardBody>
                <CCardBody>
                    선택된 주 <h4>{
                        weekStart + " - " + weekEnd
                    }</h4>
                </CCardBody>
                <CCardBody>
                    <AddReport />
                </CCardBody>
            </CCardGroup>
            <hr></hr>
            <CCardGroup>
                <CCardBody>
                    이번주
                    <CDataTable
                        fields={fields}
                        items={data}
                        itemsPerPage={5}
                        pagination
                    />
                </CCardBody>
                <CCardBody>
                    다음주
                    <CDataTable
                        fields={fields}
                        items={data2}
                        itemsPerPage={5}
                        pagination
                    />
                </CCardBody>
            </CCardGroup>
        </CCard >
    )
}

export default WeeklyReport;