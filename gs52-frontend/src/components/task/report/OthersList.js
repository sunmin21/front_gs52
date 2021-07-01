import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CModalBody, CHeader, CCardGroup, CCardBody, CDataTable } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { reportAxios, nextreportAxios } from "src/modules/task/report";
import { EmpList } from "src/lib/api/task/ReportAPI";

// 팀원 리스트 불러오기 + 팀원 주간보고 띄우기

const OthersList = ({ check }) => {
    let [empid, setEmpId] = useState();
    let [empname, setEmpName] = useState();

    const [userContents, setUserContents] = useState([]);

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
        EmpList().then((data) => {
            setUserContents(
                data.map((item) => {
                    return {
                        사원번호: item.emp_INDEX,
                        이름: item.emp_NAME,
                        부서: item.dept_NAME,
                        팀: item.team_NAME,
                        직급: item.position_NAME,
                        직책: item.rank_NAME,
                        선택: false,
                    }
                })
            );
        });
    }, [check]);

    useEffect(() => {
        // dispatch(reportAxios(emp, weekStart, weekEnd))
    }, [dispatch]);

    const fields = [
        { key: "이름", _style: { width: "20%", textAlign: "center" } },
        { key: "부서", _style: { width: "20%", textAlign: "center" } },
        { key: "팀", _style: { width: "20%", textAlign: "center" } },
        { key: "직급", _style: { width: "20%", textAlign: "center" } },
        { key: "직책", _style: { width: "20%", textAlign: "center" } },
    ];

    const reportfields = ["contents", "date"];
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
                emp: empid,
                weekStart: moment(weekStart).day(0).format("YYYY-MM-DD"),
                weekEnd: moment(weekStart).day(6).format("YYYY-MM-DD"),
            })
        );

        dispatch(
            nextreportAxios({
                emp: empid,
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
            <CHeader>팀원 선택</CHeader>
            <CDataTable
                items={userContents}
                fields={fields}
                columnFilter
                tableFilter
                footer
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                pagination
                border
                onRowClick={(item) => {
                    console.log("item on click !!!!!!!")
                    // const select = document.getElementsByClassName(item.사원번호);
                    setEmpName(item.이름);
                    setEmpId(item.사원번호);
                    console.log(empname + " | " + empid)         
                }}
                scopedSlots={{
                    이름: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                            {item.이름}
                    </td>
                    ),

                    부서: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                        {item.부서}
                    </td>
                    ),

                    팀: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                        {item.팀}
                    </td>
                    ),

                    직급: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                        {item.직급}
                    </td>
                    ),

                    직책: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                    {item.직책}
                    </td>
                    ),
                }}
            />
            <br />
            <CHeader>보고서 조회</CHeader>
            <br />            
            <h4 style={{color:"blue"}}>" {empname} "님의 주간보고서</h4>
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
                    fields={reportfields}
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
                    fields={reportfields}
                    items={nextdata}
                    itemsPerPage={10}
                    onRowClick={eventOnclick}
                    sorterValue={{ column: "date", asc: "true" }}
                    pagination
                />
                </CCardBody>
            </CCardGroup>
        </CModalBody>
    );
};

export default OthersList;
