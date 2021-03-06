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
  CTextarea,
} from "@coreui/react";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import modalcontent from "src/components/task/BusinessProgress/Search";
import Modal from "src/containers/common/UserModal";
import { InsertProject } from "src/lib/api/schedule/Project";
import { empAxios, teamAxios } from "src/modules/annual/memberSchedule";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { userList } from "src/lib/api/auth/auth";

const ProjectCreate = () => {
  let user = getCurrentUser();

  console.log("Project user");
  console.log(user);
  const [no, setNo] = useState([]);
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
  useEffect(() => {
    dispatch(teamAxios());
    dispatch(empAxios());
  }, [dispatch]);

  const { search, confirm } = useSelector(({ emp }) => {
    return {
      search: emp.search,
      confirm: emp.searchConfirm,
    };
  });

  const [data, setData] = useState([
    {
      사원번호: user.index,
    },
  ]);

  const [userContents, setUserContents] = useState([]);
  const updatedate = moment().format("YYYY-MM-DD HH:mm:ss");
  const [titlecheck, setTitlecheck] = useState(false);
  const [contentcheck, setContentCheck] = useState(false);
  const [empcheck, setEmpcheck] = useState(false);
  const [filecheck, setFilecheck] = useState(false);
  useEffect(() => {
    userList().then((data) => {
      setUserContents(
        data.map((item) => {
          return {
            사원번호: item.emp_INDEX,
            사원아이디: item.emp_ID,
            이름: item.emp_NAME,
            부서: item.dept_NAME,
            팀: item.team_NAME,
            직책: item.position_NAME,
            선택: false,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    setNo(data.map((item) => Number(item.사원번호)));
    setData((data) =>
      data.concat(
        Array.from(
          new Set(confirm.filter((item) => !no.includes(Number(item.사원번호))))
        )
      )
    );
  }, [confirm]);
  useEffect(() => {
    setNo(data.map((item) => Number(item.사원번호)));
  }, [data]);
  useEffect(() => {
    let leader = userContents.filter((item) => {
      return Number(item.사원번호) === Number(user.index);
    });

    setNo(data.map((item) => Number(item.사원번호)));
    setData(
      userContents.filter((item) => {
        return Number(item.사원번호) === Number(user.index);
      })
    );
  }, [userContents]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (content.타이틀 === "") {
      setTitlecheck(true);
      return;
    }
    if (content.내용 === "") {
      setContentCheck(true);
      return;
    }
    if (data.length === 0) {
      setEmpcheck(true);
      return;
    }
    const formData = new FormData();
    formData.append("PROJECT_TITLE", content.타이틀);
    formData.append("PROJECT_CONTENT", content.내용);
    formData.append("PROJECT_DATE", updatedate);
    formData.append("PROJECT_START", content.시작기간);
    formData.append("PROJECT_END", content.종료기간);
    formData.append("PROJECT_WITH_LEADER", user.index);

    formData.append(
      "PROJECT_WITH_EMP_INDEXS",
      data.map((item) => item["사원번호"])
    );

    for (let key of Object.keys(content.파일)) {
      if (key !== "length") {
        formData.append("FILES", content.파일[key]);
      }
    }

    InsertProject(formData);
    history.goBack();
  };
  const [filename, setFileName] = useState("");

  useEffect(() => {
    Array.from(content.파일).map((a, key) => {
      if (key === 0) {
        Filename.current = "";
      }
      if (content.파일.length === 1) {
        Filename.current += a.name;
      } else {
        if (content.파일.length - 1 === key) {
          Filename.current += a.name;
          if (Filename.current.length >= 80) {
            Filename.current =
              Filename.current.substring(0, 80) +
              "... 총 " +
              content.파일.length +
              "개";
          }
        } else {
          Filename.current += a.name + " ,   ";
        }
      }
      setFileName(Filename.current);
    });
  }, [filename, content.파일]);

  let Filename = useRef("");
  console.log(data);
  return (
    <>
      {" "}
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>프로젝트 생성</CCardHeader>
          <CCardBody>
            <CForm
              onSubmit={handleSubmit}
              action="/1"
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
            >
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>프로젝트 생성자</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <p className="form-control-static">{user.username}</p>
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
                    value={content.타이틀}
                    onChange={(e) => {
                      setContent((content) => ({
                        ...content,
                        타이틀: e.target.value,
                      }));
                    }}
                  />
                  {titlecheck && (
                    <CAlert
                      color="danger"
                      closeButton
                      onClick={() => {
                        setTitlecheck(false);
                      }}
                    >
                      제목을 입력하세요
                    </CAlert>
                  )}
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
                    value={content.내용}
                    onChange={(e) => {
                      setContent((content) => ({
                        ...content,
                        내용: e.target.value,
                      }));
                    }}
                  />
                  {contentcheck && (
                    <CAlert
                      color="danger"
                      closeButton
                      onClick={() => {
                        setContentCheck(false);
                      }}
                    >
                      내용을 입력하세요
                    </CAlert>
                  )}
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
                    value={content.시작기간 || date}
                    min={date}
                    onChange={(e) => {
                      if (content.시작기간 >= content.종료기간) {
                        setContent((content) => ({
                          ...content,
                          시작기간: e.target.value,
                          종료기간: e.target.value,
                        }));
                      } else {
                        setContent((content) => ({
                          ...content,
                          시작기간: e.target.value,
                        }));
                      }
                    }}
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
                    value={content.종료기간 || date}
                    min={content.시작기간 || date}
                    onChange={(e) => {
                      if (e.target.value > content.시작기간) {
                        setContent((content) => ({
                          ...content,
                          종료기간: e.target.value,
                        }));
                      }
                    }}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">참여원 선택</CLabel>
                </CCol>

                <CCol xs="6" md="2">
                  {data.map((content, key) => {
                    console.log(key);
                    if (key === 0) {
                      return (
                        <CButton
                          block
                          variant="outline"
                          color="dark"
                          key={key}
                          style={{
                            background:
                              "linear-gradient(#ff9a9e, #fad0c4, #fad0c4)",
                          }}
                          onClick={() => {
                            window.confirm("프로젝트생성자");
                          }}
                        >
                          {content.부서} {content.팀} {content.이름}
                        </CButton>
                      );
                    } else if (key % 2 === 0) {
                      return (
                        <CButton
                          block
                          variant="outline"
                          color="dark"
                          key={key}
                          onClick={() => {
                            if (window.confirm("삭제하시겠습니까?")) {
                              setData(
                                data.filter(
                                  (item) => item.사원번호 !== content.사원번호
                                )
                              );
                            }
                          }}
                        >
                          {content.부서} {content.팀} {content.이름}
                        </CButton>
                      );
                    }
                  })}
                </CCol>
                <CCol xs="6" md="2">
                  {data.map((content, key) => {
                    if (key % 2 === 1) {
                      return (
                        <CButton
                          block
                          variant="outline"
                          color="dark"
                          key={key}
                          onClick={() => {
                            if (window.confirm("삭제하시겠습니까?")) {
                              setData(
                                data.filter(
                                  (item) => item.사원번호 !== content.사원번호
                                )
                              );
                            }
                          }}
                        >
                          {content.부서} {content.팀} {content.이름}
                        </CButton>
                      );
                    }
                  })}
                </CCol>

                <CCol xs="12" md="2">
                  <Modal Content={modalcontent} no={no}>
                    {" "}
                  </Modal>
                </CCol>
                {empcheck && (
                  <CCol xs="6" md="9" style={{ marginLeft: "230px" }}>
                    <CAlert
                      color="danger"
                      closeButton
                      onClick={() => {
                        setEmpcheck(false);
                      }}
                    >
                      참여인원을 선택하세요
                    </CAlert>
                  </CCol>
                )}
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel>파일첨부</CLabel>
                </CCol>
                <CCol xs="12" md="9">
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
                  {content.파일.length === 0 && (
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      File Upload..
                    </CLabel>
                  )}
                  {content.파일.length !== 0 && (
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      {filename}
                    </CLabel>
                  )}
                </CCol>
              </CFormGroup>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={() => {
                  setData(
                    userContents.filter((item) => {
                      return Number(item.사원번호) === Number(user.index);
                    })
                  );
                  setContent({
                    타이틀: "",
                    참여원: "",
                    내용: "",
                    파일: [],
                    시작기간: date,
                    종료기간: date,
                  });
                }}
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CForm>
          </CCardBody>
          <CCardFooter></CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

export default ProjectCreate;
