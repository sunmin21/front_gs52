import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "src/lib/api/auth/auth";
import {
  projectTodoAxios,
  projectWithAxios,
} from "src/modules/schedule/project/project";
import ColorModal from "./ProjectTaskColorModal";
import ProjectTaskTodo from "./ProjectTaskTodo";

const ProjectTask = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    empColor: "",
    withIndex: "",
  });
  const [userData, setUserData] = useState();

  const { projectNo, projectWith, projectTodo } = useSelector(({ project }) => {
    return {
      projectNo: project.projectNo,
      projectWith:
        project.projectWith.filter((item) => item.project_WITH_OKAY === 1) ||
        [],
      projectTodo: project.projectTodo,
    };
  });
  const [click, setClick] = useState(false);
  useEffect(() => {}, []);
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
    return () => {
      isComponentMounted = false;
    };
  }, [projectNo, dispatch]);

  // console.log(confirm.filter());
  console.log(projectTodo);
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
                  key={projectNo}
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
                            key={key}
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
                            {userData !== "" &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].dept_NAME + "  "}

                            {userData !== "" &&
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
                        <div key={key}>
                          <CButton
                            block
                            variant="outline"
                            color="dark"
                            readOnly
                            key={key}
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
                            {userData !== "" &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].dept_NAME + "  "}
                            {userData !== "" &&
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
                        <div key={key}>
                          <CButton
                            block
                            variant="outline"
                            color="dark"
                            readOnly
                            key={key}
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
                            {userData !== "" &&
                              userData.filter(
                                (data) =>
                                  Number(data.emp_INDEX) ===
                                  item.project_WITH_EMP_INDEX
                              )[0].dept_NAME + "  "}
                            {userData !== "" &&
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
                    <CCard className="mb-0">
                      <CCardHeader>
                        <CButton
                          block
                          color="link"
                          className="text-left m-0 p-0"
                          onClick={() => setClick(!click)}
                          key={key}
                        >
                          <h5 className="m-0 p-0">
                            {item.project_TASK_CONTENT}
                          </h5>
                        </CButton>
                      </CCardHeader>
                      <CCollapse show={click}>
                        <CCardBody>ss</CCardBody>
                      </CCollapse>
                    </CCard>
                  );
                })}
              </CCol>
              <CCol xs="6" md="2">
                <ProjectTaskTodo
                  projectNo={projectNo}
                  axios={projectTodoAxios}
                  dispatch={dispatch}
                ></ProjectTaskTodo>
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default ProjectTask;
