import React, { useEffect, useState } from "react";

import "antd/dist/antd.css";

import {
  InsertProjecTaskDetail,
  UpdateProjecTask,
  UpdateProjecTaskDetail,
  UpdateProjectWithScore,
} from "src/lib/api/schedule/Project";
import { SelectCheckDept } from "src/lib/api/manager/addOptions/addOptions";
import { projectWithAxios } from "src/modules/schedule/project/project";
import { ConsoleSqlOutlined } from "@ant-design/icons";

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
  axios2,
  taskIndex,
  item,
  projectWith,
  projectNo,
  sum,
  detailIndex,
  todo,
}) => {
  // console.log(item);
  const array = [];
  if (item) {
    //업데이트시

    for (let i = 5; i <= item.project_TASK_DETAIL_PERCENT + 100 - sum; i += 5) {
      array.push(i);
    }
  } else {
    for (let i = 5; i <= 100 - sum; i += 5) {
      array.push(i);
    }
    if (sum === 100) {
      array.push(0);
    }
  }

  const [content, setContent] = useState({
    인덱스: projectNo,
    task인덱스: taskIndex,
    detail인덱스: detailIndex,
    내용: item ? item.project_TASK_DETAIL_CONTENT : "",
    진행도: item ? item.project_TASK_PERCENT : 5,
    담당자: item
      ? item.project_TASK_DETAIL_EMP
      : projectWith.length !== 0
      ? projectWith[0].project_WITH_EMP_INDEX
      : "",
    담당자이름: "",
  });

  useEffect(() => {
    setContent((cont) => ({
      ...cont,
      담당자이름:
        item &&
        projectWith.length !== 0 &&
        projectWith.filter(
          (filt) => filt.project_WITH_EMP_INDEX === item.project_TASK_DETAIL_EMP
        )[0]
          ? projectWith.filter(
              (filt) =>
                filt.project_WITH_EMP_INDEX === item.project_TASK_DETAIL_EMP
            )[0].dept_NAME +
            " " +
            projectWith.filter(
              (filt) =>
                filt.project_WITH_EMP_INDEX === item.project_TASK_DETAIL_EMP
            )[0].team_NAME +
            " " +
            projectWith.filter(
              (filt) =>
                filt.project_WITH_EMP_INDEX === item.project_TASK_DETAIL_EMP
            )[0].emp_NAME
          : projectWith.length !== 0
          ? projectWith[0].dept_NAME +
            " " +
            projectWith[0].team_NAME +
            " " +
            projectWith[0].emp_NAME
          : "",
    }));
  }, [projectWith]);
  const [check, setCheck] = useState(false);

  const [check2, setCheck2] = useState(false);

  useEffect(() => {
    if (!item && sum === 100) {
      setContent((content) => ({
        ...content,
        진행도: 0,
      }));
    } else {
      setContent((content) => ({
        ...content,
        내용: item ? item.project_TASK_DETAIL_CONTENT : "",
        진행도: item ? item.project_TASK_DETAIL_PERCENT : sum === 100 ? 0 : 5,
      }));
    }
  }, [visible]);
  // console.log(content.담당자);
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
          {check2 && (
            <CAlert
              color="danger"
              closeButton
              onClick={() => {
                setCheck2(false);
              }}
            >
              진행도 수정하세요
            </CAlert>
          )}
          <CButton
            color="secondary"
            key={content.taskIndex || taskIndex}
            onClick={() => {
              setVisible(false);
              setCheck(false);
              setContent({
                인덱스: projectNo,
                task인덱스: taskIndex,
                detail인덱스: detailIndex,
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
              if (!item && sum === 100) {
                setCheck2(true);
                return;
              }

              if (detailIndex === undefined) {
                await InsertProjecTaskDetail(content);
                await dispatch(axios(projectNo));
                await dispatch(axios2(projectNo));
                dispatch(projectWithAxios(projectNo));
              } else {
                if (
                  item.project_TASK_DETAIL_EMP !== content.담당자 &&
                  item.project_TASK_DETAIL_SUCCESS === 1
                ) {
                  await UpdateProjectWithScore({
                    index: item.project_TASK_DETAIL_EMP,
                    projectIndex: projectNo,
                    score:
                      projectWith.filter(
                        (person) =>
                          person.project_WITH_EMP_INDEX ===
                          item.project_TASK_DETAIL_EMP
                      )[0].project_WITH_SCORE -
                      (todo.project_TASK_PERCENT *
                        item.project_TASK_DETAIL_PERCENT) /
                        100,
                  });

                  await UpdateProjectWithScore({
                    index: content.담당자,
                    projectIndex: projectNo,
                    score:
                      projectWith.filter(
                        (person) =>
                          person.project_WITH_EMP_INDEX ===
                          Number(content.담당자)
                      )[0].project_WITH_SCORE +
                      (todo.project_TASK_PERCENT * content.진행도) / 100,
                  });
                } else if (
                  item.project_TASK_DETAIL_SUCCESS === 1 &&
                  content.진행도 !== item.project_TASK_DETAIL_PERCENT
                ) {
                  await UpdateProjectWithScore({
                    index: content.담당자,
                    projectIndex: projectNo,
                    score:
                      projectWith.filter(
                        (person) =>
                          person.project_WITH_EMP_INDEX === content.담당자
                      )[0].project_WITH_SCORE -
                      (todo.project_TASK_PERCENT *
                        item.project_TASK_DETAIL_PERCENT) /
                        100,
                  });

                  await UpdateProjectWithScore({
                    index: content.담당자,
                    projectIndex: projectNo,
                    score:
                      projectWith.filter(
                        (person) =>
                          person.project_WITH_EMP_INDEX === content.담당자
                      )[0].project_WITH_SCORE -
                      (todo.project_TASK_PERCENT *
                        item.project_TASK_DETAIL_PERCENT) /
                        100 +
                      (todo.project_TASK_PERCENT * content.진행도) / 100,
                  });
                }

                await UpdateProjecTaskDetail(content);
                await dispatch(axios(projectNo));
                await dispatch(axios2(projectNo));
                dispatch(projectWithAxios(projectNo));
              }

              setContent({
                인덱스: projectNo,
                task인덱스: taskIndex,
                detail인덱스: detailIndex,
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
