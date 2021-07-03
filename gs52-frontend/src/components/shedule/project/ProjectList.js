import React, { useEffect, useState } from "react";
import { CCardBody, CDataTable } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { proceedingAxios } from "src/modules/schedule/project/projectList";
import { projectNoChange } from "src/modules/schedule/project/project";
import { SelectProceeding } from "src/lib/api/schedule/ProjectList";
const usersData = [
    {
        번호: 1,
        프로젝트명: "첫 번째 프로젝트 어쩌구 저쩌구",
        시작: "2021-03-01",
        종료: "2021-04-01",
        담당자: "Guest",
    },
    {
        번호: 2,
        프로젝트명: "이게 바로 두 번째 프로젝트다",
        시작: "2021-04-01",
        종료: "2021-05-01",
        담당자: "Member",
    },
    {
        번호: 3,
        프로젝트명: "리액트를 이용한 세 번째 프로젝트",
        시작: "2021-05-01",
        종료: "2021-06-01",
        담당자: "Staff",
    },
    {
        번호: 4,
        프로젝트명: "네 번째 프로젝트는 스프링 부트",
        시작: "2021-06-01",
        종료: "2021-07-01",
        담당자: "Admin",
    },
    {
        번호: 5,
        프로젝트명: "가장 최근에 생긴 다섯 번째 프로젝트",
        시작: "2021-07-01",
        종료: "2021-08-01",
        담당자: "Member",
    },
    ];
function ProjectList() {
    let [emp] = useState(8);
    const history = useHistory();
    //const test = SelectProceeding(emp);
   // console.log(test);
    const dispatch = useDispatch();
    const { proceeding } = useSelector((state) => {
        console.log(state);
        return {
            proceeding: state.projectList.proceeding,
        };
    });
    useEffect(() => {
        dispatch(proceedingAxios(emp));
    }, [dispatch]);

    const fields = ["번호", "프로젝트명", "시작", "종료"
        // { key: "번호", _style: { width: "5%" } },
        // { key: "프로젝트명", _style: { width: "50%" } },
        // "시작",
        // "종료",
        // { key: "담당자", _style: { width: "20%" } },
    ];
    console.log(proceeding)
    const data = proceeding.map((item) => {
        return {
            번호: item.project_INDEX,
            프로젝트명: item.project_TITLE,
            시작: item.project_START,
            종료: item.project_END,
        };
    });

    return (
        <CCardBody>
            <CDataTable
                items={usersData}
                fields={fields}
                columnFilter
                tableFilter
                footer
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                sorterValue={{ column: "번호", desc: "true" }}
                pagination
                onRowClick={(item) => {
                history.push({
                    pathname: `/schedule/project/detail`,
                });
                dispatch(projectNoChange({ index: item.번호 }));
            }}
        />
        </CCardBody>
    );
}

export default ProjectList;
