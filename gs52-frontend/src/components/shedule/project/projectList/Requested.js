import React, { useEffect, useState } from "react";
import { CCardBody, CDataTable, CBadge, CButton, CCollapse, CInput, CCardGroup, CCard } from "@coreui/react";
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
        case "닫기":
            return "secondary";
        default:
        return "primary";
    }
};
    
function Requested() {

    const [details, setDetails] = useState([])
    const [text, setText] = useState();
    const handleChange = (e) => {
        setText(e.target.value);
    }

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
            setDetails(newDetails)
    }
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
        3: "닫기"
    };

    const data = requested.map((item, key) => ({
        pwindex: item.project_WITH_INDEX,
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
                    { key: "프로젝트명", _style: { width: "30%" } },
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
                sorterValue={{ column: "번호", asc: "true" }}
                pagination
                // onRowClick={(item) => {
                //     history.push({
                //         pathname: `/schedule/project/detail`,
                //     });
                //     dispatch(projectNoChange({ index: item.번호 }));
                // }}
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
                                onClick={async (e) => {
                                    console.log(item.pwindex)
                                await UpdateRequested(item.pwindex, 1, "null");
                                await dispatch(requestedAxios(emp));
                            }}
                            >
                            <CBadge color={getBadge(Done[1])}>
                                {Done[1]}
                            </CBadge>
                        </CButton>
                    </td>
                    ),
                    거절:
                    (item, index)=>{
                        return (
                        <td className="py-2">
                            <CButton onClick={()=>{toggleDetails(index)}}>
                                {details.includes(index)
                                ? <CBadge color={getBadge(Done[3])}>
                                    {Done[3]}
                                </CBadge>
                                : <CBadge color={getBadge(Done[2])}>
                                    {Done[2]}
                                </CBadge>}
                            </CButton>
                        </td>
                        )
                    },
                    'details':
                        (item, index)=>{
                        return (
                        <CCollapse show={details.includes(index)}>
                            <CCard>
                                <CCardBody>
                                        <CInput placeholder="거절 사유를 적어주세요"
                                            onChange={handleChange}/>
                                    <br />
                                    <CButton size="sm" color="danger" className="ml-1"
                                        onClick={async (e) => {
                                            await UpdateRequested(item.pwindex, 2, text );
                                            await dispatch(requestedAxios(emp));
                                        }}>
                                        거절
                                    </CButton>
                                </CCardBody>
                            </CCard>
                        </CCollapse>
                        )
                    }
                }}
            />
        </CCardBody>
    );
}

export default Requested;
