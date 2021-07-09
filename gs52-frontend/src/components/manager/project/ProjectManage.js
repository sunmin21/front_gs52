import React, { useEffect, useState } from "react";
import { CCol, CRow, CBadge, CDataTable, CCardBody, CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { projectNoChange } from "src/modules/schedule/project/project";
import { okayAxios } from "src/modules/manager/Project";
import { UpdateOKay } from "src/lib/api/manager/project/ProjectAPI";
import { proceedingAxios, askedAxios } from "src/modules/schedule/project/projectList";

const getBadge = (status) => {
    switch (status) {
        case "승인":
            return "success";
        case "거부":
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
            pindex: item.project_INDEX,
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
                <CCardBody style={{textAlign:"center"}}>
                    <CDataTable
                    items={data}
                    fields={[
                        { key: "번호", _style: { width: "10%" } },
                        { key: "프로젝트명", _style: { width: "30%" } },
                        "시작",
                        "종료",
                        { key: "담당자", _style: { width: "10%" } },
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
                    sorterValue={{ column: "번호", asc: "true" }}
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
                        수락: (item) => (
                            <td>
                                <CButton
                                    onClick={async (e) => {
                                        console.log(item.pindex + "번 승인")
                                        await UpdateOKay(item.pindex, 1);
                                        await dispatch(okayAxios());
                                    }}
                                >
                                <CBadge color={getBadge(Done[1])}>
                                    {Done[1]}
                                </CBadge>
                            </CButton>
                        </td>
                        ),
                        거부: (item) => (
                            <td>
                                <CButton
                                    onClick={async (e) => {
                                        console.log(item.pindex + "번 거부") 
                                        await UpdateOKay(item.pindex, 2);
                                        await dispatch(okayAxios());
                                    }}
                                >
                                <CBadge color={getBadge(Done[2])}>
                                    {Done[2]}
                                </CBadge>
                            </CButton>
                        </td>
                    )}}
                />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default ProjectManage