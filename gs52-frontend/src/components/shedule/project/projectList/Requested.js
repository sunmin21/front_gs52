import React, { useEffect, useState } from "react";
import {
  CCardBody,
  CDataTable,
  CBadge,
  CButton,
  CCollapse,
  CInput,
  CCardGroup,
  CCard,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  proceedingAxios,
  requestedAxios,
} from "src/modules/schedule/project/projectList";
import { projectNoChange } from "src/modules/schedule/project/project";
import { UpdateRequested } from "src/lib/api/schedule/ProjectList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { Button, Badge } from "antd";

function Requested({ dispatch }) {
  const user = getCurrentUser();
  let [emp] = useState(user.index);

  const [details, setDetails] = useState([]);
  const [text, setText] = useState();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const history = useHistory();
  const { requested } = useSelector((state) => {
    return {
      requested: state.projectList.requested,
    };
  });

  useEffect(() => {
    dispatch(requestedAxios(emp));
    dispatch(proceedingAxios(emp));
  }, [dispatch]);

  const data = requested.map((item, key) => ({
    pwindex: item.project_WITH_INDEX,
    번호: key + 1, // index를 1부터 세 주기 위해서
    프로젝트명: item.project_TITLE,
    시작: item.project_START,
    종료: item.project_END,
    담당자: item.emp_NAME,
    상태: item.project_WITH_OKAY,
    사유: item.project_WITH_REJECT,
    인덱스: item.project_INDEX,
  }));

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
          "반려",
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
          프로젝트명: (item) => (
            <td
              onClick={() => {
                history.push({
                  pathname: `/schedule/project/detail`,
                });
                dispatch(projectNoChange({ index: item.인덱스 }));
              }}
            >
              {item.프로젝트명}
            </td>
          ),
          상태: (item) => (
            <td>
              <Badge status="warning" text="대기" />
            </td>
          ),
          수락: (item) => (
            <td className="py-2">
              <Button
                type="primary"
                onClick={async (e) => {
                  await UpdateRequested(item.pwindex, 1, "null");
                  await dispatch(requestedAxios(emp));
                  await dispatch(proceedingAxios(emp));
                }}
              >
                수락
              </Button>
            </td>
          ),
          반려: (item, index) => {
            return (
              <td className="py-2">
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "닫기" : "반려"}
                </Button>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCard>
                  <CCardBody>
                    <CInput
                      placeholder="반려 사유를 적어주세요"
                      onChange={handleChange}
                    />
                    <br />
                    <Button
                      type="primary"
                      danger
                      onClick={async (e) => {
                        await UpdateRequested(item.pwindex, 2, text);
                        await dispatch(requestedAxios(emp));
                      }}
                    >
                      반려
                    </Button>
                  </CCardBody>
                </CCard>
              </CCollapse>
            );
          },
        }}
      />
    </CCardBody>
  );
}

export default Requested;
