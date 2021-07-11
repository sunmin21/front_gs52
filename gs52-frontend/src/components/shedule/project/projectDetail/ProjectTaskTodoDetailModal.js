import React, { useEffect, useState } from "react";

import "antd/dist/antd.css";

import {
  InsertProjecTaskDetail,
  UpdateProjecTask,
} from "src/lib/api/schedule/Project";
import { SelectCheckDept } from "src/lib/api/manager/addOptions/addOptions";

const {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInput,
  CCol,
  CFormGroup,
  CLabel,
  CTextarea,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CAlert,
} = require("@coreui/react");

const ProjectTaskTodoModal = ({
  visible,
  setVisible,
  dispatch,
  axios,
  taskIndex,
  item,
  projectWith,
}) => {
  const array = [];
  for (let i = 5; i <= 100; i += 5) {
    array.push(i);
  }
  console.log(taskIndex);
  const [content, setContent] = useState({
    task인덱스: taskIndex,

    내용: item ? item.project_TASK_CONTENT : "",
    진행도: item ? item.project_TASK_PERCENT : 5,
    담당자:
      projectWith.length !== 0 ? projectWith[0].project_WITH_EMP_INDEX : "",
    담당자이름:
      projectWith.length !== 0
        ? projectWith[0].dept_NAME +
          " " +
          projectWith[0].team_NAME +
          " " +
          projectWith[0].emp_NAME
        : "",
  });
  const [check, setCheck] = useState(false);

  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>할일 디테일 추가</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">프로젝트 할일</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea
                name="내용"
                id="textarea-input"
                rows="6"
                placeholder="Content..."
                value={content.내용}
                key={content.taskIndex || taskIndex}
                onChange={(e) => {
                  setContent((cont) => ({
                    ...cont,
                    내용: e.target.value,
                  }));
                }}
              />
              {check && (
                <CAlert
                  color="danger"
                  closeButton
                  onClick={() => {
                    setCheck(false);
                  }}
                >
                  내용을입력하세요
                </CAlert>
              )}
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">진행도</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CDropdown>
                <CDropdownToggle color="secondary">
                  {content.진행도 + "%"}
                </CDropdownToggle>
                <CDropdownMenu>
                  {array.map((item, key) => {
                    return (
                      <CDropdownItem
                        name={item}
                        key={key}
                        onClick={(e) => {
                          setContent((cont) => ({
                            ...cont,
                            진행도: e.target.name,
                          }));
                        }}
                      >
                        {item}%
                      </CDropdownItem>
                    );
                  })}
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">담당자</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CDropdown>
                <CDropdownToggle color="secondary">
                  {content.담당자이름}
                </CDropdownToggle>
                <CDropdownMenu>
                  {projectWith.length !== 0 &&
                    projectWith.map((item, key) => {
                      return (
                        <CDropdownItem
                          name={item.project_WITH_EMP_INDEX}
                          key={key}
                          onClick={(e) => {
                            setContent((cont) => ({
                              ...cont,
                              담당자: e.target.name,
                              담당자이름:
                                item.dept_NAME +
                                " " +
                                item.team_NAME +
                                " " +
                                item.emp_NAME,
                            }));
                          }}
                        >
                          {" "}
                          {item.dept_NAME +
                            " " +
                            item.team_NAME +
                            " " +
                            item.emp_NAME}
                        </CDropdownItem>
                      );
                    })}
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            key={content.taskIndex || taskIndex}
            onClick={() => {
              setVisible(false);
              setCheck(false);
              setContent({
                task인덱스: taskIndex,

                내용: "",
                진행도: 5,
                담당자:
                  projectWith.length !== 0
                    ? projectWith[0].project_WITH_EMP_INDEX
                    : "",
                담당자이름:
                  projectWith.length !== 0
                    ? projectWith[0].dept_NAME +
                      " " +
                      projectWith[0].team_NAME +
                      " " +
                      projectWith[0].emp_NAME
                    : "",
              });
            }}
          >
            취소
          </CButton>

          <CButton
            color="primary"
            onClick={async () => {
              if (content.내용 === "") {
                setCheck(true);
                return;
              }

              await InsertProjecTaskDetail(content);

              await dispatch(axios(taskIndex));
              setContent({
                task인덱스: taskIndex,

                내용: "",
                진행도: 5,
                담당자:
                  projectWith.length !== 0
                    ? projectWith[0].project_WITH_EMP_INDEX
                    : "",
                담당자이름:
                  projectWith.length !== 0
                    ? projectWith[0].dept_NAME +
                      " " +
                      projectWith[0].team_NAME +
                      " " +
                      projectWith[0].emp_NAME
                    : "",
              });
              setCheck(false);
              setVisible(false);
            }}
          >
            저장
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default React.memo(ProjectTaskTodoModal);
