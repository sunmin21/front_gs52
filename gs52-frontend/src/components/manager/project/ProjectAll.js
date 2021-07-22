import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CCard,
  CDataTable,
  CCardBody,
  CButton,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { projectNoChange } from "src/modules/schedule/project/project";
import { AllAxios, okayAxios } from "src/modules/manager/Project";
import { UpdateOKay } from "src/lib/api/manager/project/ProjectAPI";
import { Badge, Button } from "antd";
import "antd/dist/antd.css";
const getBadge = (status) => {
  switch (status) {
    case "대기":
      return "warning";
    case "승인":
      return "success";
    case "반려":
      return "error";
    default:
      return "primary";
  }
};
const Done = {
  0: "대기",
  1: "승인",
  2: "반려",
};
function ProjectAll() {
  const user = getCurrentUser();
  let [emp] = useState(user.index);

  const dispatch = useDispatch();

  const history = useHistory();
  const { all } = useSelector((state) => {
    return {
      all: state.projectOkay.all,
    };
  });

  useEffect(() => {
    dispatch(AllAxios(user.roles[0]));
  }, [dispatch]);

  const data = all.map((item, key) => {
    return {
      pindex: item.project_INDEX,
      번호: key + 1, // index를 1부터 세 주기 위해서
      프로젝트명: item.project_TITLE,
      시작: item.project_START,
      종료: item.project_END,
      담당자: item.emp_NAME,
      상태: item.project_OKAY,
      인덱스: item.project_INDEX,
    };
  });
  console.log(data);
  return (
    <CRow>
      <CCol>
        <CCardBody
          style={{
            textAlign: "center",
          }}
        >
          <CDataTable
            items={data}
            fields={[
              { key: "번호", _style: { width: "10%" } },
              { key: "프로젝트명", _style: { width: "30%" } },
              "시작",
              "종료",
              { key: "담당자", _style: { width: "10%" } },
              "상태",
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
                  <td
                    onClick={() => {
                      dispatch(projectNoChange({ index: item.인덱스 }));
                      history.push({
                        pathname: `/task/project/detail`,
                      });
                    }}
                  >
                    {item.프로젝트명}
                  </td>
                );
              },
              상태: (item) => (
                <td>
                  <Badge
                    status={getBadge(Done[item.상태])}
                    text={Done[item.상태]}
                  ></Badge>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCol>
    </CRow>
  );
}

export default ProjectAll;
