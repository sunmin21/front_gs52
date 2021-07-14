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
} from "src/modules/schedule/project/project";
import ColorModal from "./ProjectTaskColorModal";
import ProjectTaskTodoInsert from "./ProjectTaskTodoInsert";
import ProjectTaskTodoInsertDetail from "./ProjectTaskTodoDetailInsert";
import {
  DeleteProjecTask,
  DeleteProjecTaskAll,
  DeleteProjecTaskDetail,
  UpdateProjecTaskDetailSuccess,
} from "src/lib/api/schedule/Project";
import PieChart from "./PieChart";
//import PieChart from "./PieChart"

const ProjectInsite = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

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

  const [content, setContent] = useState({
    empColors: [...projectWith.map((item) => item.project_WITH_COLOR)],
    withIndex: "",
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

  // console.log(...projectTodoDetail.map((a, key) => key));
  // console.log("에에");
  // console.log(projectWith);
  // console.log(projectTodo);

  return (
    <>
      <CCol xs="14" md="14" style={{ marginTop: "10px" }}>
        <CCard>
          <CCardHeader>인사이트 </CCardHeader>

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">프로젝트 기여도</CLabel>
              </CCol>

              <CCol xs="6" md="8">
                {/* <CChartPie
                  datasets={[
                    {
                      backgroundColor: [
                        ...projectWith.map((item) => item.project_WITH_COLOR),
                      ],
                      data: [
                        ...projectWith.map((item) => item.project_WITH_SCORE),
                      ],
                    },
                  ]}   
                  labels={[...projectWith.map((item) => item.emp_NAME)]}
                  options={{
                    tooltips: {
                      enabled: true,

                    },
                  }}
                /> */}
                <PieChart projectWith={projectWith} />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">프로젝트 할일</CLabel>
              </CCol>
              <CCol xs="9" md="7">
                {projectTodo.map((item, key) => {
                  // console.log(item);
                  return (
                    <CCard
                      className="mb-0"
                      key={
                        "cczxcs" +
                        item.project_TASK_PERCENT +
                        item.project_TASK_CONTENT
                      }
                    >
                      <CCardHeader key={key + item.project_TASK_CONTENT}>
                        <CButton
                          block
                          color="link"
                          className="text-left m-0 p-0"
                          onClick={(e) => {
                            setClickContent(
                              e.target.innerHTML + item.project_TASK_INDEX
                            );
                            setClick(!click);
                          }}
                          id={key}
                          key={"bbxzcv" + key}
                        >
                          <h5 className="m-0 p-0" name={key}>
                            {item.project_TASK_CONTENT +
                              "(" +
                              item.project_TASK_PERCENT +
                              "%)"}
                          </h5>
                        </CButton>
                        <CButton //삭제
                          active
                          color="danger"
                          aria-pressed="true"
                          style={{ textAlign: "center", float: "right" }}
                          onClick={async () => {
                            // console.log(item.project_TASK_INDEX);
                            await DeleteProjecTaskAll(item.project_TASK_INDEX);
                            await DeleteProjecTask(item.project_TASK_INDEX);

                            await dispatch(projectTodoAxios(projectNo));
                          }}
                          key={"bb23@@xzcv" + key}
                        >
                          삭제
                        </CButton>
                        <ProjectTaskTodoInsert //업데이트
                          projectNo={projectNo}
                          axios={projectTodoAxios}
                          dispatch={dispatch}
                          taskIndex={item.project_TASK_INDEX}
                          item={item}
                          sum={
                            projectTodo.length !== 0
                              ? projectTodo[0].percent_SUM
                              : 0
                          }
                        ></ProjectTaskTodoInsert>
                        <ProjectTaskTodoInsertDetail //디테일등록
                          projectNo={projectNo}
                          projectWith={projectWith}
                          taskIndex={item.project_TASK_INDEX}
                          axios={projectTodoAxios}
                          axios2={projectTodoDetailAxios}
                          dispatch={dispatch}
                          sum={item.detail_SUM}
                        ></ProjectTaskTodoInsertDetail>
                        <CProgress
                          value={item.detail_SUCCESS_SUM}
                          showPercentage
                          precision={2}
                          className="mb-3"
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
                        key={key + "zxczvsdwe2"}
                      >
                        <CCardBody>
                          {projectTodoDetail.map((item2, key) => {
                            // console.log(item2);
                            // console.log(key);
                            if (
                              item2.project_TASK_INDEX ===
                              item.project_TASK_INDEX
                            )
                              return (
                                <div key={key + "aczcse=234"}>
                                  <CSwitch
                                    className={"mx-1"}
                                    shape={"pill"}
                                    color={"success"}
                                    labelOn={"\u2713"}
                                    labelOff={"\u2715"}
                                    value="asdf"
                                    name={item2.project_TASK_DETAIL_CONTENT}
                                    key={"@#!$@!$!" + key + "!@4"}
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
                                        await UpdateProjecTaskDetailSuccess({
                                          index:
                                            item2.project_TASK_DETAIL_INDEX,
                                          success: 0,
                                        });
                                        await dispatch(
                                          projectTodoAxios(projectNo)
                                        );
                                        await dispatch(
                                          projectTodoDetailAxios(projectNo)
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

                                        await UpdateProjecTaskDetailSuccess({
                                          index:
                                            item2.project_TASK_DETAIL_INDEX,
                                          success: 1,
                                        });
                                        await dispatch(
                                          projectTodoAxios(projectNo)
                                        );
                                        await dispatch(
                                          projectTodoDetailAxios(projectNo)
                                        );
                                        await dispatch(
                                          projectWithAxios(projectNo)
                                        );
                                      }
                                    }}
                                    checked={check[key] === 1}
                                  />

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
                                    sum={item.detail_SUM}
                                  ></ProjectTaskTodoInsertDetail>
                                  <CButton //삭제
                                    active
                                    color="danger"
                                    aria-pressed="true"
                                    style={{
                                      textAlign: "center",
                                      float: "right",
                                    }}
                                    onClick={async () => {
                                      // console.log(item.project_TASK_INDEX);
                                      await DeleteProjecTaskDetail(
                                        item2.project_TASK_DETAIL_INDEX
                                      );
                                      await dispatch(
                                        projectTodoAxios(projectNo)
                                      );
                                      await dispatch(
                                        projectTodoDetailAxios(projectNo)
                                      );
                                    }}
                                    key={"#%^!bb23@@xzcv" + key}
                                  >
                                    삭제
                                  </CButton>
                                  <CListGroup accent key={key + "Asxzcxsa32"}>
                                    <CListGroupItem
                                      accent={"dark"}
                                      style={{
                                        background: item2.project_WITH_COLOR,
                                        color: "dark",
                                      }}
                                    >
                                      {item2.project_TASK_DETAIL_CONTENT +
                                        "(" +
                                        item2.project_TASK_DETAIL_PERCENT +
                                        "%)"}
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

export default ProjectInsite;
