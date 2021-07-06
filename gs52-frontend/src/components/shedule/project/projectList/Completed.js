import React, { useEffect, useState } from "react";
import { CCardBody, CDataTable } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { proceedingAxios } from "src/modules/schedule/project/projectList";
import { projectNoChange } from "src/modules/schedule/project/project";
import moment from "moment";

function Completed({dispatch,proceeding}) {
    let [emp] = useState(8);
    const history = useHistory();
    // const dispatch = useDispatch();
    // const { proceeding } = useSelector((state) => {
    //     return {
    //         proceeding: state.projectList.proceeding,
    //     };
    // });
    useEffect(() => {
        dispatch(proceedingAxios(emp));
    }, [dispatch]);

    const date = moment().format("YYYY-MM-DD");

    const data = proceeding
        .filter(
            (item) =>
                ( item.project_END < date )
        )
        .map((item, key) => ({
            번호: key + 1, // index를 1부터 세 주기 위해서
            프로젝트명: item.project_TITLE,
            시작: item.project_START,
            종료: item.project_END,
            담당자: item.emp_NAME            
    }))

    return (
        <CCardBody>
            <CDataTable
                items={data}
                fields={[
                    { key: "번호", _style: { width: "10%" } },
                    { key: "프로젝트명", _style: { width: "45%" } },
                    "시작",
                    "종료",
                    { key: "담당자", _style: { width: "15%" } },
                ]}
                columnFilter
                tableFilter
                footer
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                sorterValue={{ column: "번호", asc: "true" }}
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

export default Completed;
