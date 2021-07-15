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
// import Liquid from "./Liquid";
import LiquidInsite from "./Liquid";
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
            <CFormGroup
              row
              style={{
                top: "1px",
                left: "1px",
                bottom: "1px",
                right: "1px",
                border: "2px solid rgba(255,255,255,0.5)",
                outline: "5px solid rgba(0,0,0,0.2)",
              }}
            >
              <CCol md="3">
                <CLabel
                  htmlFor="date-input"
                  style={{
                    display: "table",
                    fontWeight: "bold",
                    fontSize: "30px",
                    textAlign: "center",
                  }}
                >
                  프로젝트 기여도
                </CLabel>
              </CCol>

              <CCol xs="6" md="8">
                <PieChart projectWith={projectWith} />
              </CCol>
            </CFormGroup>
            <CFormGroup
              row
              style={{
                top: "1px",
                left: "1px",
                bottom: "1px",
                right: "1px",
                border: "2px solid rgba(255,255,255,0.5)",
                outline: "5px solid rgba(0,0,0,0.2)",
              }}
            >
              <CCol md="3">
                <CLabel
                  htmlFor="date-input"
                  style={{
                    display: "table",
                    fontWeight: "bold",
                    fontSize: "30px",
                    textAlign: "center",
                  }}
                >
                  업무별 완성도
                </CLabel>
              </CCol>

              <CCol xs="4" md="2">
                {projectTodo
                  .filter((t, key) => t.project_INDEX === projectNo)
                  .map((todo, key) => {
                    if (key % 4 === 0)
                      return (
                        <LiquidInsite
                          projectTodo={todo}
                          key={"asdzx@@" + key}
                          color={key}
                        />
                      );
                  })}
              </CCol>
              <CCol xs="4" md="2">
                {projectTodo
                  .filter((t, key) => t.project_INDEX === projectNo)
                  .map((todo, key) => {
                    if (key % 4 === 1)
                      return (
                        <LiquidInsite
                          projectTodo={todo}
                          key={"asdzxaaaszx@@" + key}
                          color={key}
                        />
                      );
                  })}
              </CCol>
              <CCol xs="4" md="2">
                {projectTodo
                  .filter((t, key) => t.project_INDEX === projectNo)
                  .map((todo, key) => {
                    if (key % 4 === 2)
                      return (
                        <LiquidInsite
                          projectTodo={todo}
                          key={"asdaazzxc2zx@@" + key}
                          color={key}
                        />
                      );
                  })}
              </CCol>
              <CCol xs="4" md="2">
                {projectTodo
                  .filter((t, key) => t.project_INDEX === projectNo)
                  .map((todo, key) => {
                    if (key % 4 === 3)
                      return (
                        <LiquidInsite
                          projectTodo={todo}
                          key={"azzzsdzx@@" + key}
                          color={key}
                        />
                      );
                  })}
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default ProjectInsite;
