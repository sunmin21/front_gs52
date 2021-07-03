import React, { useEffect, useState } from "react";
import { CCardBody, CDataTable } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { proceedingAxios } from "src/modules/schedule/project/project";
import { useDispatch } from "react-redux";
import { projectNoChange } from "src/modules/schedule/project/project";

function ProjectList() {

    let [emp] = useState(8);

    const dispatch = useDispatch();

    const { proceeding } = useSelector((state) => {
        console.log(state)
        return {
            proceeding : state.project.proceeding
        }
    })

    useEffect(() => {
        dispatch(proceedingAxios({ emp }))
    }, [dispatch])

    const fields = [
        { key: "번호", _style: { width: "5%" } },
        { key: "프로젝트명", _style: { width: "50%" } },
        "시작",
        "종료",
        // { key: "담당자", _style: { width: "20%" } },
    ];

    const data = proceeding.map((item) => {
        return {
            번호: item.project_INDEX,
            프로젝트명: item.project_TITLE,
            시작: item.project_START,
            종료: item.project_END,            
        }
    })

    return (
        <CCardBody>
        <CDataTable
            items={data}
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
