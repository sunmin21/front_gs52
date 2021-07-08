import React, { useEffect, useState } from "react";
import { CCol, CRow, CBadge, CDataTable, CCardBody } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { projectNoChange } from "src/modules/schedule/project/project";
import { okayAxios } from "src/modules/manager/Project";

const getBadge = (status) => {
    switch (status) {
        case "수락":
            return "success";
        case "거절":
            return "danger";
        default:
        return "primary";
    }
};

function ProjectManage() {
    
    const user = getCurrentUser();
    let [emp] = useState(user.index);

    const dispatch = useDispatch();

    const history = useHistory();
    const { okay } = useSelector((state) => {
        console.log(state)
        return {
            okay: state.projectOkay.okay,
        };
    });

    useEffect(() => {
        dispatch(okayAxios());
    }, [dispatch]);

    const Done = {
        0: "대기중",
        1: "승인",
        2: "거부",
    };

    const data = okay.map((item, key) => {
        return ({
            index: item.project_INDEX,
            번호: key + 1, // index를 1부터 세 주기 위해서
            프로젝트명: item.project_TITLE,
            시작: item.project_START,
            종료: item.project_END,
            담당자: item.emp_NAME,
            상태: item.project_OKAY,
            인덱스: item.project_INDEX,
        })
    })

    return (
        <CRow>
            <CCol>
                <h5>프로젝트 목록</h5>
                <CCardBody>
                    <CDataTable
                    items={data}
                    fields={[
                        { key: "번호", _style: { width: "10%" } },
                        { key: "프로젝트명", _style: { width: "30%" } },
                        "시작",
                        "종료",
                        { key: "담당자", _style: { width: "10%" } },
                        { key: "상태", _style: { width: "10%" } },
                        '수락',
                        '거부'
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
                    scopedSlots={{
                        프로젝트명: (item) => {
                            return (
                                <td onClick={ () => {
                                    dispatch(projectNoChange({ index: item.인덱스 }));
                                    history.push({
                                        pathname: `/schedule/project/detail`,
                                    });
                                }}>{item.프로젝트명}</td>
                            )
                        },
                        상태: (item) => (
                            <td>
                                <CBadge color={getBadge(Done[item.상태])}>
                                    {Done[item.상태]}
                                </CBadge>
                            </td>
                        ),
                    }}
                />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default ProjectManage