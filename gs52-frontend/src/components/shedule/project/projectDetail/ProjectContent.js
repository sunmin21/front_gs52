import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CTextarea,
} from "@coreui/react";

import moment from "moment";
import { array } from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import modalcontent from "src/components/task/BusinessProgress/Search";
import Modal from "src/containers/common/UserModal";
import { Redirect } from "react-router-dom";

import {
  projectAxios,
  projectFileAxios,
  projectFileChange,
  projectFileConcat,
  projectWithAxios,
} from "src/modules/schedule/project/project";
import Helpers from "./helpers";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { UpdateProject } from "src/lib/api/schedule/Project";
const user = getCurrentUser();

const ProjectContent = () => {
  const [no, setNo] = useState([]);
  const date = moment().format("YYYY-MM-DD");

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

  const [content, setContent] = useState({
    타이틀: projectContent.project_TITLE,
    참여원: [
      {
        부서: projectWith.dept_NAME,
        사원번호: projectWith.project_WITH_EMP_INDEX,
        이름: projectWith.emp_NAME,
        직책: projectWith.emp_NAME,
        팀: projectWith.team_NAME,
        리더: projectWith.project_WITH_LEADER,
        수락: projectWith.project_WITH_OKAY,
        색깔: projectWith.project_WITH_COLOR,
        거절사유: projectWith.project_WITH_REJECT,
      },
    ],
    추가할참여원: [],
    내용: projectContent.project_CONTENT,
    파일: projectFile,
    시작기간: projectContent.project_START,
    종료기간: projectContent.project_END,
  });
  const { confirm } = useSelector(({ emp }) => {
    return {
      confirm: emp.searchConfirm,
    };
  });

  useEffect(() => {
    dispatch(projectAxios(projectNo));
    dispatch(projectWithAxios(projectNo));
    dispatch(projectFileAxios(projectNo));
  }, [projectNo, dispatch]);

  useEffect(() => {
    setNo(content.참여원.map((item) => Number(item.사원번호)));
    setContent({
      타이틀: projectContent.project_TITLE,
      참여원: projectWith.map((item) => ({
        부서: item.dept_NAME,
        사원번호: item.project_WITH_EMP_INDEX,
        이름: item.emp_NAME,
        팀: item.team_NAME,
        리더: item.project_WITH_LEADER,
        수락: item.project_WITH_OKAY,
        색깔: item.project_WITH_COLOR,
        거절사유: item.project_WITH_REJECT,
      })),

      내용: projectContent.project_CONTENT,
      파일: projectFile,
      시작기간: projectContent.project_START,
      종료기간: projectContent.project_END,
    });
  }, [projectContent, projectWith, projectFile]);
  useEffect(() => {
    setContent((content) => ({
      ...content,
      참여원: content.참여원.concat(
        Array.from(
          new Set(confirm.filter((item) => !no.includes(Number(item.사원번호))))
        )
      ),
    }));
  }, [confirm]);
  useEffect(() => {
    setNo(content.참여원.map((item) => Number(item.사원번호)));
  }, [content]);
  const [updateCheck, setUpdateCheck] = useState(false);
  const titleInput = useRef();
  const contentInput = useRef();
  const startInput = useRef();
  const endInput = useRef();
  const withInput = useRef();
  const with2Input = useRef();
  const [filecheck, setFilecheck] = useState(false);

  const updatedate = moment().format("YYYY-MM-DD HH:mm:ss");
  const handleSubmit = (event) => {
    // if (content.타이틀 === "") {
    //   setTitlecheck(true);
    //   return;
    // }
    // if (content.내용 === "") {
    //   setContentCheck(true);
    //   return;
    // }
    // if (data.length === 0) {
    //   setEmpcheck(true);
    //   return;
    // }
    const formData = new FormData();

    formData.append("PROJECT_INDEX", projectContent.project_INDEX);
    formData.append("PROJECT_TITLE", content.타이틀);
    formData.append("PROJECT_CONTENT", content.내용);
    formData.append("PROJECT_UPDATE", updatedate);

    formData.append("PROJECT_START", content.시작기간);
    formData.append("PROJECT_END", content.종료기간);
    formData.append("PROJECT_WITH_LEADER", leader);
    formData.append("PROJECT_WITH_EMP", content.참여원);
    formData.append(
      "PROJECT_WITH_EMP_INDEXS",
      content.참여원.map((item) => item["사원번호"])
    );
    for (let key of Object.keys(content.파일)) {
      if (key !== "length") {
        formData.append("FILES", content.파일[key]);
      }
    }
    UpdateProject(formData);
  };
  let leader = 0;
  if (
    content.참여원.filter(
      (item) => Number(item.리더) === Number(item.사원번호)
    )[0] !== undefined
  ) {
    leader = content.참여원.filter(
      (item) => Number(item.리더) === Number(item.사원번호)
    )[0].리더;
  }
  if (projectNo === 0) {
    return <Redirect to="/schedule/project" />;
  }
  console.log(content.참여원);
  return (
    <>
      {" "}
      <CCol xs="14" md="14" style={{ marginTop: "10px" }}>
        <CCard>
          <CCardHeader>
            프로젝트 생성
            {!updateCheck &&
              projectContent.project_OKAY === 0 &&
              leader === user.index && (
                <CButton
                  size="sm"
                  color="primary"
                  style={{ float: "right" }}
                  onClick={() => {
                    titleInput.current.readOnly = false;
                    contentInput.current.readOnly = false;
                    startInput.current.readOnly = false;
                    endInput.current.readOnly = false;
                    setUpdateCheck(true);
                  }}
                >
                  <CIcon name="cil-scrubber" /> 수정
                </CButton>
              )}
            {updateCheck && (
              <>
                <CButton
                  size="sm"
                  color="danger"
                  style={{ float: "right" }}
                  onClick={() => {
                    titleInput.current.readOnly = true;
                    contentInput.current.readOnly = true;
                    startInput.current.readOnly = true;
                    endInput.current.readOnly = true;
                    setUpdateCheck(false);
                    dispatch(projectAxios(projectNo));
                    dispatch(projectWithAxios(projectNo));
                    dispatch(projectFileAxios(projectNo));
                  }}
                >
                  <CIcon name="cil-ban" /> 취소
                </CButton>
                <CButton
                  size="sm"
                  color="success"
                  style={{ float: "right" }}
                  onClick={() => {
                    titleInput.current.readOnly = true;
                    contentInput.current.readOnly = true;
                    startInput.current.readOnly = true;
                    endInput.current.readOnly = true;
                    setUpdateCheck(false);
                    handleSubmit();
                  }}
                >
                  <CIcon name="cil-save" /> 저장
                </CButton>
              </>
            )}
          </CCardHeader>

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>프로젝트 리더</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <p className="form-control-static">
                  {content.참여원[0] === undefined
                    ? "ㄴㄴ"
                    : content.참여원.filter((item) => {
                        return Number(item.리더) === Number(item.사원번호);
                      })[0] !== undefined
                    ? content.참여원.filter((item) => {
                        return Number(item.리더) === Number(item.사원번호);
                      })[0].이름
                    : "ㅁㅁ"}
                </p>
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
                  value={content.타이틀 || ""}
                  style={{ background: "white" }}
                  onChange={(e) => {
                    setContent((item) => ({
                      ...item,
                      타이틀: e.target.value,
                    }));
                  }}
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
                  value={content.내용 || ""}
                  style={{ background: "white" }}
                  onChange={(e) => {
                    setContent((item) => ({
                      ...item,
                      내용: e.target.value,
                    }));
                  }}
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
                  value={content.시작기간 || ""}
                  min={date}
                  style={{ background: "white" }}
                  onChange={(e) => {
                    setContent((item) => ({
                      ...item,
                      시작기간: e.target.value,
                    }));
                  }}
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
                  value={content.종료기간 || ""}
                  min={content.시작기간 || date}
                  onChange={(e) => {
                    if (e.target.value > content.시작기간) {
                      setContent((item) => ({
                        ...item,
                        종료기간: e.target.value,
                      }));
                    }
                  }}
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
                {content.참여원.length !== 0 &&
                  content.참여원
                    .filter((item) => item.사원번호 === item.리더)
                    .map((part, key) => {
                      console.log(part);
                      console.log("뭐지?");
                      return (
                        <CButton
                          block
                          variant="outline"
                          color="dark"
                          key={key}
                          onClick={() => {
                            if (updateCheck && window.confirm("리더입니다")) {
                            }
                          }}
                          style={{
                            background:
                              "linear-gradient(#ff9a9e, #fad0c4, #fad0c4)",
                          }}
                          innerRef={withInput}
                          readOnly
                        >
                          {part.부서} {part.팀} {part.이름}
                        </CButton>
                      );
                    })}
                {content.참여원.length !== 0 &&
                  content.참여원
                    .filter((item) => item.사원번호 !== item.리더)
                    .map((part, key) => {
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
                                setContent((item) => ({
                                  ...item,
                                  참여원: content.참여원.filter(
                                    (item) => item.사원번호 !== part.사원번호
                                  ),
                                }));
                              }
                            }}
                            innerRef={withInput}
                            readOnly
                          >
                            {part.부서} {part.팀} {part.이름}
                          </CButton>
                        );
                      }
                    })}
              </CCol>
              <CCol xs="6" md="2">
                {content.참여원.length !== 0 &&
                  content.참여원
                    .filter((item) => item.사원번호 !== item.리더)
                    .map((part, key) => {
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
                                setContent((item) => ({
                                  ...item,
                                  참여원: content.참여원.filter(
                                    (item) => item.사원번호 !== part.사원번호
                                  ),
                                }));
                              }
                            }}
                            innerRef={with2Input}
                            readOnly
                          >
                            {part.부서} {part.팀} {part.이름}
                          </CButton>
                        );
                      }
                    })}
              </CCol>
              {updateCheck && (
                <CCol xs="12" md="2">
                  <Modal Content={modalcontent} no={no}></Modal>
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
                      name={item.PROJECT_FILE_INDEX}
                      key={key}
                      onClick={(e) => {
                        if (!updateCheck) {
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
                            })
                            .catch((error) => {
                              error.json().then((json) => {});
                            });
                        } else {
                          if (window.confirm("삭제하시겠습니까?")) {
                            dispatch(
                              projectFileChange(
                                projectFile.filter(
                                  (file) =>
                                    (item.project_FILE_INDEX ||
                                      item.lastModified) !==
                                    (file.project_FILE_INDEX ||
                                      file.lastModified)
                                )
                              )
                            );
                          }
                        }
                      }}
                    >
                      {item.project_FILE_ORIGIN_NAME || item.name}
                    </CButton>
                  );
                })}
              </CCol>
            </CFormGroup>
            {updateCheck && (
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>파일등록</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputFile
                    id="file-multiple-input"
                    name="file-multiple-input"
                    multiple
                    custom
                    onChange={(e) => {
                      for (let key of Object.keys(e.target.files)) {
                        if (e.target.files[key].size > 102400000) {
                          setFilecheck(true);
                          return;
                        }
                      }

                      // setContent((content) => ({
                      //   ...content,
                      //   파일: e.target.files,
                      // }));
                      dispatch(projectFileConcat(e.target.files));
                    }}
                  ></CInputFile>
                  <CLabel htmlFor="file-multiple-input" variant="custom-file">
                    File Upload..
                  </CLabel>

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
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default ProjectContent;
