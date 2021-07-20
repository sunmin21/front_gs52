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
import { Button } from "antd";
import "antd/dist/antd.css";

function ProjectManage({ roles, index }) {
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
    console.log(index);
    dispatch(okayAxios({ roles, index }));
  }, [dispatch]);

  const data = okay.map((item, key) => {
    return {
      pindex: item.project_INDEX,
      번호: key + 1, // index를 1부터 세 주기 위해서
      프로젝트명: item.project_TITLE,
      시작: item.project_START,
      종료: item.project_END,
      담당자: item.emp_NAME,
      상태: item.project_OKAY,
      인덱스: item.project_INDEX,
      리더: item.project_WITH_LEADER,
    };
  });
  console.log(index);
  console.log(okay);
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
              수락: (item) => (
                <td className="py-2">
                  <Button
                    type="primary"
                    onClick={async (e) => {
                      await UpdateOKay(item.pindex, 1);
                      await dispatch(okayAxios({ roles, index: item.리더 }));
                      await dispatch(AllAxios(roles));
                    }}
                  >
                    수락
                  </Button>
                </td>
              ),
              반려: (item) => (
                <td className="py-2">
                  <Button
                    type="primary"
                    danger
                    onClick={async (e) => {
                      await UpdateOKay(item.pindex, 2);
                      await dispatch(okayAxios({ roles, index: item.리더 }));
                      await dispatch(AllAxios(roles));
                    }}
                  >
                    반려
                  </Button>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCol>
    </CRow>
  );
}

export default ProjectManage;
