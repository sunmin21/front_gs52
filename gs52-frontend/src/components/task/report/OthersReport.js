import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CModalBody, CHeader, CCardGroup, CCardBody, CDataTable } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { reportAxios, nextreportAxios } from "src/modules/task/report";
import OthersList from './OthersList';
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

// 팀원 주간보고 띄우기
function OthersReport() {

    const user = getCurrentUser();
    let [emp] = useState(user.index);

    const dispatch = useDispatch();
    const { report } = useSelector((state) => {
        return {
        report: state.report.report,
        };
    });
    const { nextreport } = useSelector((state) => {
        return {
        nextreport: state.report.nextreport,
        };
    });

    useEffect(() => {
        // dispatch(reportAxios(emp, weekStart, weekEnd))
    }, [dispatch]);

    const fields = ["contents", "date"];
    const [startDate, setStartDate] = useState(new Date());

    var moment = require("moment");
    var weekStart = moment(startDate).day(0).format("YYYY-MM-DD");
    var weekEnd = moment(startDate).day(6).format("YYYY-MM-DD");

    const data = report.map((item) => {
        return {
            id: item.report_INDEX,
            emp: item.report_EMP_INDEX,
            contents: item.report_CONTENTS,
            date: item.report_TARGET_DATE,
        };
    });

    const nextdata = nextreport.map((item2) => {
        return {
            id: item2.report_INDEX,
            emp: item2.report_EMP_INDEX,
            contents: item2.report_CONTENTS,
            date: item2.report_TARGET_DATE,
        };
    });

    const showAllReport = (weekStart) => {
        setStartDate(weekStart);
        dispatch(
            reportAxios({
                emp,
                weekStart: moment(weekStart).day(0).format("YYYY-MM-DD"),
                weekEnd: moment(weekStart).day(6).format("YYYY-MM-DD"),
            })
        );

        dispatch(
            nextreportAxios({
                emp,
                weekStart: moment(weekStart).add(7, "d").day(0).format("YYYY-MM-DD"),
                weekEnd: moment(weekStart).add(7, "d").day(6).format("YYYY-MM-DD"),
            })
        );
    };

    const eventOnclick = (e) => {
        alert("타인의 보고서는 삭제가 불가합니다")
    };
    
    return (
        <CModalBody>
            <h1>{OthersList.selected=true}</h1>
            <CHeader>보고서 조회</CHeader>
            <CCardGroup style={{ textAlign: "center" }}>
            <CCardBody>
                <h5>원하는 일자를 선택하세요 </h5>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                    showAllReport(date);
                    }}
                />
                </CCardBody>
                <CCardBody>
                <h5>선택된 주 : </h5>
                <h4>{weekStart + " - " + weekEnd}</h4>
                </CCardBody>
            </CCardGroup>
            <hr></hr>
            <CCardGroup style={{ textAlign: "center" }}>
                <CCardBody>
                <h4>이번주</h4>
                <br />
                <CDataTable
                    fields={fields}
                    items={data}
                    itemsPerPage={10}
                    onRowClick={eventOnclick}
                    // 자동 정렬
                    sorterValue={{ column: "date", asc: "true" }}
                    pagination
                />
                </CCardBody>
                <CCardBody>
                <h4>다음주</h4>
                <br />
                <CDataTable
                    fields={fields}
                    items={nextdata}
                    itemsPerPage={10}
                    onRowClick={eventOnclick}
                    sorterValue={{ column: "date", asc: "true" }}
                    pagination
                />
                </CCardBody>
            </CCardGroup>
        </CModalBody>
    )
}

export default OthersReport