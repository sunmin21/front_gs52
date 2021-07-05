import React, { useEffect, useState } from "react";
import { CCardBody, CDataTable, CBadge, CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestedAxios } from "src/modules/schedule/project/projectList";
import { projectNoChange } from "src/modules/schedule/project/project";
import { UpdateRequested } from "src/lib/api/schedule/ProjectList";

const getBadge = (status) => {
    switch (status) {
        case "대기중":
            return "warning";
        case "수락":
            return "success";
        case "거절":
            return "danger";
        default:
        return "primary";
    }
};

function Requested() {
    let [emp] = useState(8);
    const history = useHistory();
    const dispatch = useDispatch();
    const { requested } = useSelector((state) => {
        return {
            requested: state.projectList.requested,
        };
    });

    useEffect(() => {
        dispatch(requestedAxios(emp));
    }, [dispatch]);

    const Done = {
        0: "대기중",
        1: "수락",
        2: "거절",
    };

    const data = requested.map((item, key) => ({
        번호: key + 1, // index를 1부터 세 주기 위해서
        프로젝트명: item.project_TITLE,
        시작: item.project_START,
        종료: item.project_END,
        담당자: item.emp_NAME,
        상태: item.project_WITH_OKAY,
        사유: item.project_WITH_REJECT
    }))

    return (
        <CCardBody>
            <CDataTable
                items={data}
                fields={[
                    { key: "번호", _style: { width: "10%" } },
                    { key: "프로젝트명", _style: { width: "40%" } },
                    "시작",
                    "종료",
                    { key: "담당자", _style: { width: "10%" } },
                    { key: "상태", _style: { width: "10%" } },
                    "수락",
                    "거절"
                ]}
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
                scopedSlots={{
                    상태: (item) => (
                        <td>
                            <CBadge color={getBadge(Done[item.상태])}>
                                {Done[item.상태]}
                            </CBadge>
                        </td>
                    ),
                    수락: (item) => (
                    <td>
                        <CButton
                            active
                            block
                            color="success"
                            onClick={async (e) => {
                                await UpdateRequested(1, "");
                                dispatch(requestedAxios());
                            }}
                            // aria-pressed="true"
                            // value={item.vacation_INDEX}
                            // name={2}
                            >
                            수락
                        </CButton>
                    </td>
                    ),
                    거절: (item) => (
                    <td>
                        <CButton
                            active
                            block
                            color="danger"
                            onClick={async (e) => {
                                await UpdateRequested(2, item.사유);
                                dispatch(requestedAxios());
                            }}
                            // aria-pressed="true"
                            // value={item.vacation_INDEX}
                            // name={2}
                            >
                            거절
                        </CButton>
                    </td>
                    ),
                }}
            />
        </CCardBody>
    );
}

export default Requested;
