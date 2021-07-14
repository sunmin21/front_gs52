import React, { useEffect, useRef, useState } from "react";

import "antd/dist/antd.css";

import {
  InsertProjecTask,
  UpdateProjecTask,
  UpdateProjectWithScore,
} from "src/lib/api/schedule/Project";
import { SelectCheckDept } from "src/lib/api/manager/addOptions/addOptions";
import {
  projectTodoAxios,
  projectTodoDetailAxios,
  projectWithAxios,
} from "src/modules/schedule/project/project";

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
  projectNo,
  taskIndex,
  item,
  sum,
  detail,
  projectWith,
}) => {
  const array = [];
  console.log(detail);
  console.log(projectWith);
  if (item) {
    //업데이트시

    for (let i = 5; i <= item.project_TASK_PERCENT + 100 - sum; i += 5) {
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
    task인덱스: taskIndex,
    인덱스: projectNo,
    내용: item ? item.project_TASK_CONTENT : "",
    진행도: item ? item.project_TASK_PERCENT : sum === 100 ? 0 : 5,
  });
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
        내용: item ? item.project_TASK_CONTENT : "",
        진행도: item ? item.project_TASK_PERCENT : sum === 100 ? 0 : 5,
      }));
    }
  }, [visible]);
  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>할일 추가 </CModalTitle>
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
                key={content.taskIndex || projectNo}
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
              {/* <CInput
                name="요청사항"
                id="textarea-input"
                rows="6"
                placeholder="Content..."
              /> */}
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
            key={content.taskIndex || projectNo}
            onClick={() => {
              setVisible(false);
              setCheck(false);
              setContent({
                task인덱스: taskIndex,
                인덱스: projectNo,
                내용: "",
                진행도: 5,
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
              if (taskIndex === undefined) {
                await InsertProjecTask(content);
                await dispatch(axios(projectNo));
              } else {
                if (item.project_TASK_PERCENT !== content.진행도) {
                  // console.log(projectWith);
                  // console.log("여기탓냐1");
                  detail.map(async (item2) => {
                    console.log(item2);
                    if (item2.project_TASK_DETAIL_SUCCESS === 1) {
                      // console.log("여기탓냐2");
                      // console.log(projectNo);
                      // console.log(
                      //   projectWith.filter(
                      //     (person) =>
                      //       person.project_WITH_EMP_INDEX ===
                      //       item2.project_TASK_DETAIL_EMP
                      //   )[0].project_WITH_SCORE
                      // );
                      // console.log(item.project_TASK_PERCENT);
                      // console.log(item2.project_TASK_DETAIL_PERCENT);
                      // console.log(
                      //   Math.abs(
                      //     projectWith.filter(
                      //       (person) =>
                      //         person.project_WITH_EMP_INDEX ===
                      //         item2.project_TASK_DETAIL_EMP
                      //     )[0].project_WITH_SCORE -
                      //       (item.project_TASK_PERCENT *
                      //         item2.project_TASK_DETAIL_PERCENT) /
                      //         100
                      //   )
                      // );
                      await UpdateProjectWithScore({
                        index: item2.project_TASK_DETAIL_EMP,
                        projectIndex: projectNo,
                        score: Math.abs(
                          projectWith.filter(
                            (person) =>
                              person.project_WITH_EMP_INDEX ===
                              item2.project_TASK_DETAIL_EMP
                          )[0].project_WITH_SCORE -
                            (item.project_TASK_PERCENT *
                              item2.project_TASK_DETAIL_PERCENT) /
                              100
                        ),
                      });
                      // console.log("여기탓냐3");
                      // console.log(
                      //   Math.abs(
                      //     projectWith.filter(
                      //       (person) =>
                      //         person.project_WITH_EMP_INDEX ===
                      //         item2.project_TASK_DETAIL_EMP
                      //     )[0].project_WITH_SCORE -
                      //       (item.project_TASK_PERCENT *
                      //         item2.project_TASK_DETAIL_PERCENT) /
                      //         100
                      //   )
                      // );
                      // console.log(projectNo);
                      // console.log(
                      //   projectWith.filter(
                      //     (person) =>
                      //       person.project_WITH_EMP_INDEX ===
                      //       item2.project_TASK_DETAIL_EMP
                      //   )[0].project_WITH_SCORE -
                      //     (item.project_TASK_PERCENT *
                      //       item2.project_TASK_DETAIL_PERCENT) /
                      //       100
                      // );
                      // console.log(content.진행도);
                      // console.log(item2.project_TASK_DETAIL_PERCENT);
                      // console.log(
                      //   Math.abs(
                      //     projectWith.filter(
                      //       (person) =>
                      //         person.project_WITH_EMP_INDEX ===
                      //         item2.project_TASK_DETAIL_EMP
                      //     )[0].project_WITH_SCORE -
                      //       (item.project_TASK_PERCENT *
                      //         item2.project_TASK_DETAIL_PERCENT) /
                      //         100
                      //   ) +
                      //     (content.진행도 * item2.project_TASK_DETAIL_PERCENT) /
                      //       100
                      // );
                      await UpdateProjectWithScore({
                        index: item2.project_TASK_DETAIL_EMP,
                        projectIndex: projectNo,
                        score:
                          Math.abs(
                            projectWith.filter(
                              (person) =>
                                person.project_WITH_EMP_INDEX ===
                                item2.project_TASK_DETAIL_EMP
                            )[0].project_WITH_SCORE -
                              (item.project_TASK_PERCENT *
                                item2.project_TASK_DETAIL_PERCENT) /
                                100
                          ) +
                          (content.진행도 * item2.project_TASK_DETAIL_PERCENT) /
                            100,
                      });
                    }
                  });

                  await UpdateProjecTask(content);
                  await dispatch(projectWithAxios(projectNo));
                  await dispatch(projectTodoAxios(projectNo));
                  await dispatch(projectTodoDetailAxios(projectNo));
                }
              }
              setContent({
                task인덱스: taskIndex,
                인덱스: projectNo,
                내용: "",
                진행도: 5,
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
