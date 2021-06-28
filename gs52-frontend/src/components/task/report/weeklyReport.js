import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CCard, CCardBody, CCardHeader, CCardGroup, CDataTable } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { reportAxios, delreportAxios } from 'src/modules/task/report';
import AddReport from "./AddReport";
import { DeleteReport } from "src/lib/api/task/ReportAPI";

function WeeklyReport() {

    let [emp] = useState(1);

    const dispatch = useDispatch();
    const { report } = useSelector((state) => {
        return {
            report: state.report.report
        };
    });
    const { nextreport } = useSelector((state) => {
        return {
            nextreport: state.report.nextreport
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
        console.log("item : " + item)
        return ({
            id: item.report_INDEX,
            emp : item.report_EMP_INDEX,
            contents: item.report_CONTENTS,
            date: item.report_TARGET_DATE,
        })
    })

    const data2 = nextreport.map((item2) => {
        return ({
            id: item2.report_INDEX,
            emp : item2.report_EMP_INDEX,
            contents: item2.report_CONTENTS,
            date: item2.report_TARGET_DATE,
        })
    })

    const showReport = (weekStart) => {
        setStartDate(weekStart)
        return (dispatch(reportAxios({ emp, weekStart: moment(weekStart).day(0).format("YYYY-MM-DD"), weekEnd: moment(weekStart).day(6).format("YYYY-MM-DD") })))
    }

    const showNextReport = (weekStart) => {
        weekStart = (weekStart.getDate() + 7);
        return (dispatch(reportAxios({ emp, weekStart: moment(weekStart).day(0).format("YYYY-MM-DD"), weekEnd: moment(weekStart).day(6).format("YYYY-MM-DD") })))
    }

    // 열 클릭시 삭제 기능
    const eventOnclick = (e) => {
        console.log(e.id)
        var msg = "삭제하시겠습니까?";
        
        if (window.confirm(msg) != 0) {
            console.log("삭제");
            // report_index를 가져옴
            // dispatch(delreportAxios({id : e.id}));
            // 자동 rendering
            DeleteReport(e.id);
            dispatch(reportAxios())
            // 자동 렌더링이 안돼 @@@@@@@@@@@@@@@@@@@@@@@@
        } else {
            console.log("삭제취소");
        }
    };

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
                        onChange={(date) => {showNextReport(date)}}
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
                        itemsPerPage={10}
                        onRowClick={eventOnclick}
                        pagination
                    />
                </CCardBody>
                <CCardBody>
                    다음주
                    <CDataTable
                        fields={fields}
                        items={data2}
                        itemsPerPage={10}
                        onRowClick={eventOnclick}
                        pagination
                    />
                </CCardBody>
            </CCardGroup>
        </CCard >
    )
}

export default WeeklyReport;