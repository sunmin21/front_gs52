import { CodeSandboxCircleFilled } from "@ant-design/icons";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFormGroup,
  CLabel,
  CListGroup,
  CListGroupItem,
  CProgress,
  CSwitch,
} from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "src/lib/api/auth/auth";
import {
  projectTodoAxios,
  projectTodoDetailAxios,
  projectWithAxios,
  renderLoad,
} from "src/modules/schedule/project/project";
import ColorModal from "./ProjectTaskColorModal";
import ProjectTaskTodoInsert from "./ProjectTaskTodoInsert";
import ProjectTaskTodoInsertDetail from "./ProjectTaskTodoDetailInsert";
import {
  DeleteProjecTask,
  DeleteProjecTaskAll,
  DeleteProjecTaskDetail,
  SelectProjectWithScore,
  UpdateProjecTaskDetailSuccess,
  UpdateProjectWithScore,
} from "src/lib/api/schedule/Project";
import React from "react";

const ProjectTask = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const [content, setContent] = useState({
    empColor: "",
    withIndex: "",
  });
  const [userData, setUserData] = useState();

  const { projectNo, projectWith, projectTodo, projectTodoDetail } =
    useSelector(({ project }) => {
      return {
        projectNo: project.projectNo,
        projectWith:
          project.projectWith.filter((item) => item.project_WITH_OKAY === 1) ||
          [],
        projectTodo: project.projectTodo,
        projectTodoDetail: project.projectTodoDetail,
      };
    });

  const [click, setClick] = useState(false);
  const [clickContent, setClickContent] = useState("");

  const [check, setCheck] = useState([]);
  useEffect(() => {
    setCheck(projectTodoDetail.map((a, key) => a.project_TASK_DETAIL_SUCCESS));
  }, [projectTodoDetail]);
  useEffect(() => {
    let isComponentMounted = true;
    const fetchData = async () => {
      const response = await userList();

      if (isComponentMounted) {
        setUserData(response);
      }
    };
    fetchData();
    // userList().then((data) => setUserData(data));
    dispatch(projectWithAxios(projectNo));
    dispatch(projectTodoAxios(projectNo));
    dispatch(projectTodoDetailAxios(projectNo));

    return () => {
      isComponentMounted = false;
    };
  }, [projectNo, dispatch]);

  return (
    <>
      <CCol xs="14" md="14" style={{ marginTop: "10px" }}>
        <CCard>
          <CCardHeader>업무 </CCardHeader>

          <CCardBody>
            <CFormGroup row>
              <CCol md="2">
                <CLabel
                  htmlFor="date-input"
                  style={{
                    display: "table",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  프로젝트 인원
                </CLabel>
              </CCol>

              <CCol xs="6" md="3">
                <ColorModal
                  key={"zxcbqw" + projectNo}
                  visible={visible}
                  setVisible={setVisible}
                  axios={projectWithAxios}
                  axios2={projectTodoDetailAxios}
                  dispatch={dispatch}
                  projectNo={projectNo}
                  empColor={content.empColor}
                  withIndex={content.withIndex}
                ></ColorModal>
                {projectWith &&
                  projectWith.map((item, key) => {
                    if (key % 3 === 0)
                      return (
                        <div key={"zxc" + key + "xac24252"}>
                          <CButton
                            block
                            variant="outline"
                            color="dark"
                            readOnly
                            key={"acxzcsdasw" + key}
                            onClick={async () => {
                              await setVisible(false);
                              await setVisible(true);
                              setContent({
                                empColor: item.project_WITH_COLOR,
                                withIndex: item.project_WITH_INDEX,
                              });
                            }}
                            style={{
                              background: item.project_WITH_COLOR,
                              color: "white",
                              textShadow:
                                "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                            }}
                          >
                            {userData !== undefined &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].dept_NAME + "  "}

                            {userData !== undefined &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].team_NAME + "\n"}
                            {item.project_WITH_LEADER ===
                              item.project_WITH_EMP_INDEX && "리더 "}
                            {item.emp_NAME}
                          </CButton>
                        </div>
                      );
                  })}
              </CCol>
              <CCol xs="6" md="3">
                {projectWith &&
                  projectWith.map((item, key) => {
                    if (key % 3 === 1)
                      return (
                        <div key={"zxczcwes" + key}>
                          <CButton
                            block
                            variant="outline"
                            color="dark"
                            readOnly
                            key={"Aszcxcsa$#" + key}
                            onClick={async () => {
                              await setVisible(false);
                              await setVisible(true);
                              setContent({
                                empColor: item.project_WITH_COLOR,
                                withIndex: item.project_WITH_INDEX,
                              });
                            }}
                            style={{
                              background: item.project_WITH_COLOR,
                              color: "white",
                              textShadow:
                                "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                            }}
                          >
                            {" "}
                            {userData !== undefined &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].dept_NAME + "  "}
                            {userData !== undefined &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].team_NAME + "\n"}
                            {item.project_WITH_LEADER ===
                              item.project_WITH_EMP_INDEX && "리더 "}
                            {item.emp_NAME}
                          </CButton>
                        </div>
                      );
                  })}
              </CCol>
              <CCol xs="6" md="3">
                {projectWith &&
                  projectWith.map((item, key) => {
                    if (key % 3 === 2) {
                      return (
                        <div key={"ssdds!@#$" + key}>
                          <CButton
                            block
                            variant="outline"
                            color="dark"
                            readOnly
                            key={"axse@#$d" + key}
                            onClick={() => {
                              setVisible(true);
                              setContent({
                                empColor: item.project_WITH_COLOR,
                                withIndex: item.project_WITH_INDEX,
                              });
                            }}
                            style={{
                              background: item.project_WITH_COLOR,
                              color: "white",
                              textShadow:
                                "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                            }}
                          >
                            {" "}
                            {userData !== undefined &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].dept_NAME + "  "}
                            {userData !== undefined &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].team_NAME + "\n"}
                            {item.project_WITH_LEADER ===
                              item.project_WITH_EMP_INDEX && "리더 "}
                            {item.emp_NAME}
                          </CButton>
                        </div>
                      );
                    }
                  })}
              </CCol>
            </CFormGroup>
            <CFormGroup row style={{ marginTop: "50px" }}>
              <CCol md="3">
                <CLabel
                  htmlFor="date-input"
                  style={{
                    display: "table",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  프로젝트 할일
                </CLabel>
              </CCol>
              <CCol xs="9" md="7">
                {projectTodo.map((item, key) => {
                  return (
                    <CCard
                      className="mb-0"
                      key={
                        "cczxc@@A$s" +
                        item.project_TASK_PERCENT +
                        item.project_TASK_CONTENT
                      }
                    >
                      <CCardHeader
                        key={key + item.project_TASK_CONTENT + "@#Azxcsexc..a"}
                      >
                        <CButton
                          block
                          color="link"
                          className="text-left m-3 p-0"
                          onClick={(e) => {
                            setClickContent(
                              e.target.innerHTML + item.project_TASK_INDEX
                            );
                            setClick(!click);
                          }}
                          id={key}
                          key={"bbxzc@#!$v" + key}
                          // style={{}}
                        >
                          <h5 className="m-0 p-0" name={key}>
                            {item.project_TASK_CONTENT +
                              "(" +
                              item.project_TASK_PERCENT +
                              "%)"}
                          </h5>
                        </CButton>
                        <ProjectTaskTodoInsert //업데이트
                          projectNo={projectNo}
                          axios={projectTodoAxios}
                          dispatch={dispatch}
                          taskIndex={item.project_TASK_INDEX}
                          detail={projectTodoDetail.filter(
                            (item2) =>
                              item2.project_TASK_INDEX ===
                              item.project_TASK_INDEX
                          )}
                          item={item}
                          sum={
                            projectTodo.length !== 0
                              ? projectTodo[0].percent_SUM
                              : 0
                          }
                          key={key + "zxc213455@#"}
                          projectWith={projectWith}
                        ></ProjectTaskTodoInsert>
                        <CButton //삭제
                          active
                          color="danger"
                          aria-pressed="true"
                          style={{ textAlign: "center", float: "right" }}
                          onClick={async () => {
                            await projectTodoDetail
                              .filter(
                                (detail) =>
                                  detail.project_TASK_INDEX ===
                                  item.project_TASK_INDEX
                              )
                              .map(async (item2) => {
                                if (item2.project_TASK_DETAIL_SUCCESS === 1) {
                                  await UpdateProjectWithScore({
                                    index: item2.project_TASK_DETAIL_EMP,
                                    projectIndex: projectNo,
                                    score: Math.abs(
                                      (await (
                                        await SelectProjectWithScore(
                                          item2.project_TASK_DETAIL_EMP,
                                          item.project_INDEX
                                        )
                                      ).data) -
                                        (item.project_TASK_PERCENT *
                                          item2.project_TASK_DETAIL_PERCENT) /
                                          100
                                    ),
                                  });

                                  await dispatch(projectWithAxios(projectNo));
                                }
                              });

                            await DeleteProjecTaskAll(item.project_TASK_INDEX); //디테일 전체 삭제
                            await DeleteProjecTask(item.project_TASK_INDEX); //테스크 삭제

                            await dispatch(projectTodoAxios(projectNo));
                          }}
                          key={"bb23@@xzcv" + key}
                        >
                          삭제
                        </CButton>

                        <ProjectTaskTodoInsertDetail //디테일등록
                          projectNo={projectNo}
                          projectWith={projectWith}
                          taskIndex={item.project_TASK_INDEX}
                          axios={projectTodoAxios}
                          axios2={projectTodoDetailAxios}
                          dispatch={dispatch}
                          sum={item.detail_SUM}
                          key={key + "!axz@#!$"}
                        ></ProjectTaskTodoInsertDetail>
                        <CProgress
                          value={item.detail_SUCCESS_SUM}
                          showPercentage
                          precision={2}
                          className="mb-3"
                          key={key + "!zzxzcfaxz@#!$"}
                        />
                      </CCardHeader>
                      <CCollapse
                        show={
                          clickContent ===
                            item.project_TASK_CONTENT +
                              "(" +
                              item.project_TASK_PERCENT +
                              "%)" +
                              item.project_TASK_INDEX && click
                        }
                        key={key + "zxc@#zvsdwe2"}
                      >
                        <CCardBody>
                          {projectTodoDetail.map((item2, key) => {
                            if (
                              item2.project_TASK_INDEX ===
                              item.project_TASK_INDEX
                            )
                              return (
                                <div key={key + "aczcse=234"}>
                                  <ProjectTaskTodoInsertDetail //업데이트
                                    projectNo={projectNo}
                                    projectWith={projectWith}
                                    axios={projectTodoAxios}
                                    axios2={projectTodoDetailAxios}
                                    dispatch={dispatch}
                                    taskIndex={item.project_TASK_INDEX}
                                    detailIndex={
                                      item2.project_TASK_DETAIL_INDEX
                                    }
                                    item={item2}
                                    todo={item}
                                    sum={item.detail_SUM}
                                  ></ProjectTaskTodoInsertDetail>
                                  <CButton //삭제
                                    active
                                    color="danger"
                                    aria-pressed="true"
                                    style={{
                                      textAlign: "center",
                                      float: "right",
                                      marginLeft: "20px",
                                      marginTop: "5px",
                                    }}
                                    onClick={async () => {
                                      if (
                                        item2.project_TASK_DETAIL_SUCCESS === 1
                                      ) {
                                        await UpdateProjectWithScore({
                                          index: item2.project_TASK_DETAIL_EMP,
                                          projectIndex: item2.project_INDEX,
                                          score:
                                            projectWith.filter(
                                              (person) =>
                                                person.project_WITH_EMP_INDEX ===
                                                item2.project_TASK_DETAIL_EMP
                                            )[0].project_WITH_SCORE -
                                            (item.project_TASK_PERCENT *
                                              item2.project_TASK_DETAIL_PERCENT) /
                                              100,
                                        });
                                      }
                                      await DeleteProjecTaskDetail(
                                        item2.project_TASK_DETAIL_INDEX
                                      );
                                      await dispatch(
                                        projectTodoAxios(projectNo)
                                      );
                                      await dispatch(
                                        projectTodoDetailAxios(projectNo)
                                      );
                                      await dispatch(
                                        projectWithAxios(projectNo)
                                      );
                                    }}
                                    key={"#%^!bb23@@xzcv" + key}
                                  >
                                    삭제
                                  </CButton>
                                  <CListGroup key={key + "Asxzcxsa32"}>
                                    <CListGroupItem
                                      key={key + "zzxcsw!axz@#!$"}
                                      style={
                                        check[key] !== 1
                                          ? {
                                              fontSize: "15px",
                                              textAlign: "left",
                                              fontWeight: "bold",
                                              maxHeight: "40px",
                                              borderRadius: "20px",
                                              background: "white",
                                              border:
                                                "solid " +
                                                item2.project_WITH_COLOR,
                                              borderWidth: "4px 4px 4px 20px",

                                              paddingBottom: "30px",
                                              marginBottom: "10px",
                                            }
                                          : {
                                              fontSize: "15px",
                                              textAlign: "left",
                                              fontWeight: "bold",
                                              maxHeight: "40px",
                                              borderRadius: "20px",
                                              background:
                                                item2.project_WITH_COLOR,

                                              border:
                                                "solid " +
                                                item2.project_WITH_COLOR,
                                              borderWidth: "4px 4px 4px 20px",
                                              paddingBottom: "30px",
                                              marginBottom: "10px",
                                              float: "left",
                                            }
                                      }
                                    >
                                      {item2.project_TASK_DETAIL_CONTENT +
                                        "(" +
                                        item2.project_TASK_DETAIL_PERCENT +
                                        "%)   "}
                                      <div
                                        key={key + "zxc$^!axz@#!$"}
                                        style={{
                                          float: "right",

                                          paddingBottom: "500px",
                                        }}
                                      >
                                        <CSwitch
                                          className={"mx-1"}
                                          size="sm"
                                          shape={"pill"}
                                          color={"info"}
                                          labelOn={"\u2713"}
                                          labelOff={"\u2715"}
                                          name={
                                            item2.project_TASK_DETAIL_CONTENT
                                          }
                                          key={"@#!$@!$!" + key + "!@4"}
                                          style={{ background: "red" }}
                                          onChange={async (e) => {
                                            if (check[key] === 1) {
                                              setCheck((con) => {
                                                return con.map((c, ky) => {
                                                  if (key === ky) {
                                                    return 0;
                                                  } else {
                                                    return c;
                                                  }
                                                });
                                              });
                                              await UpdateProjecTaskDetailSuccess(
                                                {
                                                  index:
                                                    item2.project_TASK_DETAIL_INDEX,
                                                  success: 0,
                                                }
                                              );

                                              await UpdateProjectWithScore({
                                                index:
                                                  item2.project_TASK_DETAIL_EMP,
                                                projectIndex:
                                                  item2.project_INDEX,
                                                score:
                                                  projectWith.filter(
                                                    (person) =>
                                                      person.project_WITH_EMP_INDEX ===
                                                      item2.project_TASK_DETAIL_EMP
                                                  )[0].project_WITH_SCORE -
                                                  (item.project_TASK_PERCENT *
                                                    item2.project_TASK_DETAIL_PERCENT) /
                                                    100,
                                              });

                                              await dispatch(
                                                projectTodoAxios(projectNo)
                                              );
                                              await dispatch(
                                                projectTodoDetailAxios(
                                                  projectNo
                                                )
                                              );
                                              await dispatch(
                                                projectWithAxios(projectNo)
                                              );
                                            } else {
                                              setCheck((con) => {
                                                return con.map((c, ky) => {
                                                  if (key === ky) {
                                                    return 1;
                                                  } else {
                                                    return c;
                                                  }
                                                });
                                              });

                                              await UpdateProjecTaskDetailSuccess(
                                                {
                                                  index:
                                                    item2.project_TASK_DETAIL_INDEX,
                                                  success: 1,
                                                }
                                              );

                                              await UpdateProjectWithScore({
                                                index:
                                                  item2.project_TASK_DETAIL_EMP,
                                                projectIndex:
                                                  item2.project_INDEX,
                                                score:
                                                  projectWith.filter(
                                                    (person) =>
                                                      person.project_WITH_EMP_INDEX ===
                                                      item2.project_TASK_DETAIL_EMP
                                                  )[0].project_WITH_SCORE +
                                                  (item.project_TASK_PERCENT *
                                                    item2.project_TASK_DETAIL_PERCENT) /
                                                    100,
                                              });

                                              await dispatch(
                                                projectTodoAxios(projectNo)
                                              );
                                              await dispatch(
                                                projectTodoDetailAxios(
                                                  projectNo
                                                )
                                              );
                                              await dispatch(
                                                projectWithAxios(projectNo)
                                              );
                                            }
                                          }}
                                          checked={check[key] === 1}
                                        />
                                      </div>
                                    </CListGroupItem>
                                  </CListGroup>
                                </div>
                              );
                          })}
                        </CCardBody>
                      </CCollapse>
                    </CCard>
                  );
                })}
              </CCol>
              <CCol xs="6" md="2">
                <ProjectTaskTodoInsert
                  projectNo={projectNo}
                  axios={projectTodoAxios}
                  dispatch={dispatch}
                  sum={
                    projectTodo.length !== 0 ? projectTodo[0].percent_SUM : 0
                  }
                ></ProjectTaskTodoInsert>
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default React.memo(ProjectTask);
