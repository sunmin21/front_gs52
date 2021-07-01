import CIcon from "@coreui/icons-react";
import {
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
  CInputCheckbox,
  CInputFile,
  CInputRadio,
  CLabel,
  CSelect,
  CSwitch,
  CTextarea,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalcontent from "src/components/task/BusinessProgress/Search";
import Modal from "src/containers/common/UserModal";
import { empAxios, teamAxios } from "src/modules/annual/memberSchedule";
const ProjectCreate = () => {
  const [content, setContent] = useState({
    타이틀: "",
    참여원: "",
    내용: "",
    파일: "",
    시작기간: "",
    종료기간: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(teamAxios());
    dispatch(empAxios());
  }, [dispatch]);
  const { search } = useSelector(({ emp }) => ({
    search: emp.search,
  }));
  console.log(search);
  return (
    <>
      {" "}
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>프로젝트 생성</CCardHeader>
          <CCardBody>
            <CForm
              action=""
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
                  <CFormText>This is a help text</CFormText>
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
                    value={content.시작날짜 || ""}
                    onChange={(e) => {
                      setContent((content) => ({
                        ...content,
                        시작날짜: e.target.value,
                      }));
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
                    value={content.종료날짜 || ""}
                    onChange={(e) => {
                      setContent((content) => ({
                        ...content,
                        종료날짜: e.target.value,
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
                  {search.map((content, key) => {
                    if (key % 2 === 0) {
                      return (
                        <CButton block variant="outline" color="dark" key={key}>
                          {content.부서} {content.팀} {content.이름}
                        </CButton>
                      );
                    }
                  })}
                </CCol>
                <CCol xs="6" md="2">
                  {search.map((content, key) => {
                    if (key % 2 === 1) {
                      return (
                        <CButton block variant="outline" color="dark" key={key}>
                          {content.부서} {content.팀} {content.이름}
                        </CButton>
                      );
                    }
                  })}
                </CCol>
                <CCol xs="12" md="2">
                  <Modal Content={modalcontent}></Modal>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Select</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="select" id="select">
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="selectLg">Select Large</CLabel>
                </CCol>
                <CCol xs="12" md="9" size="lg">
                  <CSelect custom size="lg" name="selectLg" id="selectLg">
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="selectSm">Select Small</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom size="sm" name="selectSm" id="SelectLm">
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                    <option value="4">Option #4</option>
                    <option value="5">Option #5</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="disabledSelect">Disabled Select</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect
                    custom
                    name="disabledSelect"
                    id="disabledSelect"
                    disabled
                    autoComplete="name"
                  >
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol tag="label" sm="3" className="col-form-label">
                  Switch checkboxes
                </CCol>
                <CCol sm="9">
                  <CSwitch className="mr-1" color="primary" defaultChecked />
                  <CSwitch
                    className="mr-1"
                    color="success"
                    defaultChecked
                    variant="outline"
                  />
                  <CSwitch
                    className="mr-1"
                    color="warning"
                    defaultChecked
                    variant="opposite"
                  />
                  <CSwitch
                    className="mr-1"
                    color="danger"
                    defaultChecked
                    shape="pill"
                  />
                  <CSwitch
                    className="mr-1"
                    color="info"
                    defaultChecked
                    shape="pill"
                    variant="outline"
                  />
                  <CSwitch
                    className="mr-1"
                    color="dark"
                    defaultChecked
                    shape="pill"
                    variant="opposite"
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Radios</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="checkbox">
                    <CInputRadio
                      className="form-check-input"
                      id="radio1"
                      name="radios"
                      value="option1"
                    />
                    <CLabel variant="checkbox" htmlFor="radio1">
                      Option 1
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="checkbox">
                    <CInputRadio
                      className="form-check-input"
                      id="radio2"
                      name="radios"
                      value="option2"
                    />
                    <CLabel variant="checkbox" htmlFor="radio2">
                      Option 2
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="checkbox">
                    <CInputRadio
                      className="form-check-input"
                      id="radio3"
                      name="radios"
                      value="option3"
                    />
                    <CLabel variant="checkbox" htmlFor="radio3">
                      Option 3
                    </CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Inline Radios</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio
                      custom
                      id="inline-radio1"
                      name="inline-radios"
                      value="option1"
                    />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                      One
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio
                      custom
                      id="inline-radio2"
                      name="inline-radios"
                      value="option2"
                    />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                      Two
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio
                      custom
                      id="inline-radio3"
                      name="inline-radios"
                      value="option3"
                    />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio3">
                      Three
                    </CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Checkboxes</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="checkbox1"
                      name="checkbox1"
                      value="option1"
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="checkbox1"
                    >
                      Option 1
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="checkbox2"
                      name="checkbox2"
                      value="option2"
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="checkbox2"
                    >
                      Option 2
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="checkbox3"
                      name="checkbox3"
                      value="option3"
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="checkbox3"
                    >
                      Option 3
                    </CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Inline Checkboxes</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom
                      id="inline-checkbox1"
                      name="inline-checkbox1"
                      value="option1"
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor="inline-checkbox1"
                    >
                      One
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom
                      id="inline-checkbox2"
                      name="inline-checkbox2"
                      value="option2"
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor="inline-checkbox2"
                    >
                      Two
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom
                      id="inline-checkbox3"
                      name="inline-checkbox3"
                      value="option3"
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor="inline-checkbox3"
                    >
                      Three
                    </CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CLabel col md="3" htmlFor="file-input">
                  File input
                </CLabel>
                <CCol xs="12" md="9">
                  <CInputFile id="file-input" name="file-input" />
                </CCol>
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
                  />
                  <CLabel htmlFor="file-multiple-input" variant="custom-file">
                    Choose Files...
                  </CLabel>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CLabel col md={3}>
                  Custom file input
                </CLabel>
                <CCol xs="12" md="9">
                  <CInputFile custom id="custom-file-input" />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    Choose file...
                  </CLabel>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary">
              <CIcon name="cil-scrubber" /> Submit
            </CButton>
            <CButton type="reset" size="sm" color="danger">
              <CIcon name="cil-ban" /> Reset
            </CButton>
          </CCardFooter>
        </CCard>
        <CCard>
          <CCardHeader>
            Inline
            <small> Form</small>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" inline>
              <CFormGroup className="pr-1">
                <CLabel htmlFor="exampleInputName2" className="pr-1">
                  Name
                </CLabel>
                <CInput
                  id="exampleInputName2"
                  placeholder="Jane Doe"
                  required
                />
              </CFormGroup>
              <CFormGroup className="pr-1">
                <CLabel htmlFor="exampleInputEmail2" className="pr-1">
                  Email
                </CLabel>
                <CInput
                  type="email"
                  id="exampleInputEmail2"
                  placeholder="jane.doe@example.com"
                  required
                />
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary">
              <CIcon name="cil-scrubber" /> Submit
            </CButton>
            <CButton type="reset" size="sm" color="danger">
              <CIcon name="cil-ban" /> Reset
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

export default ProjectCreate;
