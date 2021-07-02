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
const ProjectCreate = () => {
  const [content, setContent] = useState({
    타이틀: "",
    참여원: "",
    내용: "",
    파일: [],
    시작기간: "",
    종료기간: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(teamAxios());
    dispatch(empAxios());
  }, [dispatch]);
  const [data, setData] = useState([]);
  const { search } = useSelector(({ emp }) => {
    return {
      search: emp.search,
    };
  });
  useEffect(() => {
    setData(search);
  }, [search]);
  const date = moment().format("YYYY-MM-DD");
  const updatedate = moment().format("YYYY-MM-DD HH:mm:ss");
  const [titlecheck, setTitlecheck] = useState(false);
  const [contentcheck, setContentCheck] = useState(false);
  const [empcheck, setEmpcheck] = useState(false);
  const [filecheck, setFilecheck] = useState(false);
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
    formData.append("PROJECT_WITH_READER", 2);
    formData.append(
      "PROJECT_WITH_EMP_INDEXS",
      data.map((item) => item["사원번호"])
    );

    for (let key of Object.keys(content.파일)) {
      if (key !== "length") {
        console.log(content.파일[key]);
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
                      setContent((content) => ({
                        ...content,
                        종료기간: e.target.value,
                      }));
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
                    if (key % 2 === 0) {
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
                  <Modal Content={modalcontent}></Modal>
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
                  <CLabel>Multiple File input</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputFile
                    id="file-multiple-input"
                    name="file-multiple-input"
                    multiple
                    custom
                    onChange={(e) => {
                      for (let key of Object.keys(e.target.files)) {
                        if (e.target.files[key].size > 102400) {
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
                      100MB를 초과하였습니다.
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
              <CButton type="reset" size="sm" color="danger">
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
