import { ProjectFilled } from "@ant-design/icons";
import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputFile,
  CLabel,
  CLink,
  CTextarea,
} from "@coreui/react";
import fileDownload from "file-saver";
import { times } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import modalcontent from "src/components/task/BusinessProgress/Search";
import Modal from "src/containers/common/UserModal";
import { InsertProject } from "src/lib/api/schedule/Project";
import { empAxios, teamAxios } from "src/modules/annual/memberSchedule";
import {
  projectAxios,
  projectFileAxios,
  projectWithAxios,
  projectWithChange,
} from "src/modules/schedule/project/project";
import Helpers from "./helpers";
const ProjectContent = () => {
  const date = moment().format("YYYY-MM-DD");
  const [content, setContent] = useState({
    타이틀: "",
    참여원: "",
    내용: "",
    파일: [],
    시작기간: date,
    종료기간: date,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectNo, projectFile, projectContent, projectWith } = useSelector(
    ({ project }) => {
      return {
        projectNo: project.projectNo,
        projectContent: project.projectContent,
        projectFile: project.projectFile,
        projectWith: project.projectWith,
      };
    }
  );
  useEffect(() => {
    dispatch(projectAxios(projectNo));
    dispatch(projectWithAxios(projectNo));
    dispatch(projectFileAxios(projectNo));
  }, [projectNo, dispatch]);
  if (projectNo === 0) {
    history.goBack();
  }
  const [updateCheck, setUpdateCheck] = useState(false);
  const titleInput = useRef();
  const contentInput = useRef();
  const startInput = useRef();
  const endInput = useRef();
  const withInput = useRef();
  const with2Input = useRef();
  const [filecheck, setFilecheck] = useState(false);

  return (
    <>
      {" "}
      <CCol xs="14" md="14" style={{ marginTop: "10px" }}>
        <CCard>
          <CCardHeader>
            프로젝트 생성
            <CButton
              type="submit"
              size="sm"
              color="primary"
              style={{ float: "right" }}
              onClick={() => {
                console.log(titleInput.current);
                titleInput.current.readOnly = false;
                contentInput.current.readOnly = false;
                startInput.current.readOnly = false;
                endInput.current.readOnly = false;
                setUpdateCheck(true);
              }}
            >
              <CIcon name="cil-scrubber" /> 수정
            </CButton>
          </CCardHeader>

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>프로젝트 생성자</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <p className="form-control-static">Username</p>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">제목</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Text"
                  value={projectContent.project_TITLE || ""}
                  style={{ background: "white" }}
                  readOnly
                  innerRef={titleInput}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">프로젝트 내용</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="textarea-input"
                  id="textarea-input"
                  rows="9"
                  placeholder="Content..."
                  value={projectContent.project_CONTENT || ""}
                  style={{ background: "white" }}
                  innerRef={contentInput}
                  readOnly
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">시작날짜</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="date"
                  id="date-input"
                  name="date-input"
                  placeholder="date"
                  value={projectContent.project_START || ""}
                  style={{ background: "white" }}
                  innerRef={startInput}
                  readOnly
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">종료날짜</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="date"
                  id="date-input"
                  name="date-input"
                  placeholder="date"
                  value={projectContent.project_END || ""}
                  style={{ background: "white" }}
                  innerRef={endInput}
                  readOnly
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">참여원 선택</CLabel>
              </CCol>

              <CCol xs="6" md="2">
                {projectWith.length !== 0 &&
                  projectWith.map((content, key) => {
                    if (key % 2 === 0) {
                      return (
                        <CButton
                          block
                          variant="outline"
                          color="dark"
                          key={key}
                          onClick={() => {
                            if (
                              updateCheck &&
                              window.confirm("삭제하시겠습니까?")
                            ) {
                              dispatch(
                                projectWithChange(
                                  projectWith.filter(
                                    (item) => item.사원번호 !== content.사원번호
                                  )
                                )
                              );
                            }
                          }}
                          innerRef={withInput}
                          readOnly
                        >
                          {content.dept_NAME} {content.team_NAME}{" "}
                          {content.emp_NAME}
                        </CButton>
                      );
                    }
                  })}
              </CCol>
              <CCol xs="6" md="2">
                {projectWith.length !== 0 &&
                  projectWith.map((content, key) => {
                    if (key % 2 === 1) {
                      return (
                        <CButton
                          block
                          variant="outline"
                          color="dark"
                          key={key}
                          onClick={() => {
                            if (
                              updateCheck &&
                              window.confirm("삭제하시겠습니까?")
                            ) {
                              dispatch(
                                projectWithChange(
                                  projectWith.filter(
                                    (item) => item.사원번호 !== content.사원번호
                                  )
                                )
                              );
                            }
                          }}
                          innerRef={with2Input}
                          readOnly
                        >
                          {content.dept_NAME} {content.team_NAME}{" "}
                          {content.emp_NAME}
                        </CButton>
                      );
                    }
                  })}
              </CCol>
              {updateCheck && (
                <CCol xs="12" md="2">
                  <Modal Content={modalcontent}></Modal>
                </CCol>
              )}
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel>파일첨부</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {projectFile.map((item, key) => {
                  return (
                    <CButton
                      block
                      variant="outline"
                      color="dark"
                      key={key}
                      onClick={() => {
                        Helpers.httpRequest(
                          `http://192.168.20.17:3000?upload=${item.project_FILE_NAME}`,
                          "get"
                        )
                          .then((response) => response.blob())
                          .then((blob) => {
                            // create blob link
                            const url = window.URL.createObjectURL(
                              new Blob([blob])
                            );
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute(
                              "download",
                              `${item.project_FILE_ORIGIN_NAME}`
                            );

                            // append to html
                            document.body.appendChild(link);

                            // download
                            link.click();

                            // remove

                            link.parentNode.removeChild(link);
                          });
                        // .catch((error) => {
                        //   error.json().then((json) => {});
                        // });
                      }}
                    >
                      {item.project_FILE_ORIGIN_NAME}
                    </CButton>
                  );
                })}

                {updateCheck && (
                  <CInputFile
                    id="file-multiple-input"
                    name="file-multiple-input"
                    multiple
                    custom
                    onChange={(e) => {
                      for (let key of Object.keys(e.target.files)) {
                        console.log(e.target.files[key].size);
                        if (e.target.files[key].size > 102400000) {
                          setFilecheck(true);
                          return;
                        }
                      }

                      setContent((content) => ({
                        ...content,
                        파일: e.target.files,
                      }));
                    }}
                  ></CInputFile>
                )}
                {filecheck && (
                  <CAlert
                    color="danger"
                    closeButton
                    onClick={() => {
                      setFilecheck(false);
                    }}
                  >
                    1024KB를 초과하였습니다.
                  </CAlert>
                )}
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default ProjectContent;
