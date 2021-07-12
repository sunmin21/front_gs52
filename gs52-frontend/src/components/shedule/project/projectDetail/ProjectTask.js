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
  CSwitch,
} from "@coreui/react";
import { useEffect, useState } from "react";
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
  UpdateProjecTaskDetailSuccess,
} from "src/lib/api/schedule/Project";

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
  const [check, setCheck] = useState([
    ...projectTodoDetail.map((a, key) => key),
  ]);

  return (
    <>
      <CCol xs="14" md="14" style={{ marginTop: "10px" }}>
        <CCard>
          <CCardHeader>업무 </CCardHeader>

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">프로젝트 인원</CLabel>
              </CCol>

              <CCol xs="6" md="2">
                <ColorModal
                  key={"zxcbqw" + projectNo}
                  visible={visible}
                  setVisible={setVisible}
                  axios={projectWithAxios}
                  dispatch={dispatch}
                  projectNo={projectNo}
                  empColor={content.empColor}
                  withIndex={content.withIndex}
                ></ColorModal>
                {projectWith &&
                  projectWith.map((item, key) => {
                    if (key % 3 === 0)
                      return (
                        <div key={key}>
                          <CButton
                            block
                            variant="outline"
                            color="dark"
                            readOnly
                            key={"acxzcsdasw" + key}
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
                              item.project_WITH_EMP_INDEX && "프로젝트장 "}
                            {item.emp_NAME}
                          </CButton>
                        </div>
                      );
                  })}
              </CCol>
              <CCol xs="6" md="2">
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
                            key={"Aszcxcsa" + key}
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
                              item.project_WITH_EMP_INDEX && "프로젝트장 "}
                            {item.emp_NAME}
                          </CButton>
                        </div>
                      );
                  })}
              </CCol>
              <CCol xs="6" md="2">
                {projectWith &&
                  projectWith.map((item, key) => {
                    if (key % 3 === 2) {
                      return (
                        <div key={"ssdds" + key}>
                          <CButton
                            block
                            variant="outline"
                            color="dark"
                            readOnly
                            key={"axsed" + key}
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
                              item.project_WITH_EMP_INDEX && "프로젝트장 "}
                            {item.emp_NAME}
                          </CButton>
                        </div>
                      );
                    }
                  })}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">프로젝트 할일</CLabel>
              </CCol>
              <CCol xs="6" md="6">
                {projectTodo.map((item, key) => {
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
                          axios={projectTodoDetailAxios}
                          dispatch={dispatch}
                        ></ProjectTaskTodoInsertDetail>
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
                          {projectTodoDetail.map((item, key) => {
                            return (
                              <div key={key + "aczcse=234"}>
                                <CSwitch
                                  className={"mx-1"}
                                  shape={"pill"}
                                  color={"success"}
                                  labelOn={"\u2713"}
                                  labelOff={"\u2715"}
                                  value="asdf"
                                  name={item.project_TASK_DETAIL_CONTENT}
                                  key={"@#!$@!$!" + key + "!@4"}
                                  onChange={async (e) => {
                                    console.log(check);
                                    if (
                                      check[key] ===
                                      item.project_TASK_DETAIL_INDEX +
                                        item.project_TASK_DETAIL_CONTENT +
                                        "(" +
                                        item.project_TASK_DETAIL_PERCENT +
                                        "%)"
                                    ) {
                                      await UpdateProjecTaskDetailSuccess({
                                        index: item.project_TASK_DETAIL_INDEX,
                                        success: 0,
                                      });
                                      await projectTodoDetailAxios(projectNo);
                                    } else {
                                      setCheck((cont) => {
                                        return cont.map((cn, ky) => {
                                          console.log("key");
                                          console.log(key);
                                          console.log("ky");
                                          console.log(ky);
                                          if ((key = ky)) {
                                            return (
                                              item.project_TASK_DETAIL_INDEX +
                                              item.project_TASK_DETAIL_CONTENT +
                                              "(" +
                                              item.project_TASK_DETAIL_PERCENT +
                                              "%)"
                                            );
                                          } else {
                                            return cn;
                                          }
                                        });
                                      });
                                      await UpdateProjecTaskDetailSuccess({
                                        index: item.project_TASK_DETAIL_INDEX,
                                        success: 1,
                                      });
                                      await projectTodoDetailAxios(projectNo);
                                    }
                                  }}
                                  checked={
                                    item.project_TASK_DETAIL_SUCCESS === 1 ||
                                    check ===
                                      item.project_TASK_DETAIL_INDEX +
                                        item.project_TASK_DETAIL_CONTENT +
                                        "(" +
                                        item.project_TASK_DETAIL_PERCENT +
                                        "%)"
                                  }
                                />
                                <CListGroup accent key={key + "Asxzcxsa32"}>
                                  <CListGroupItem accent="dark" color="dark">
                                    {item.project_TASK_DETAIL_CONTENT +
                                      "(" +
                                      item.project_TASK_DETAIL_PERCENT +
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

export default ProjectTask;
