import { UpdateDept } from "src/lib/api/manager/addOptions/addOptions";

const {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CInput,
  CCol,
  CFormGroup,
  CAlert,
} = require("@coreui/react");
const { useState } = require("react");

const Modal = ({ index, visible, setVisible, dispatch, axios, 부서이름 }) => {
  const [show, setShow] = useState({
    show: false,
    index: 0,
  });
  const [content, setContent] = useState(부서이름);

  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>부서이름</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CInput
                placeholder="부서명"
                autoComplete="email"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CAlert
            color="danger"
            show={show["show"]}
            closeButton
            onClick={() => {
              setShow((content) => ({
                ...content,
                show: false,
              }));
            }}
          >
            모든 내용을 기입해주세요.
          </CAlert>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              setContent(부서이름);
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              if (content !== "") {
                UpdateDept(index, content);
                dispatch(axios());
                setContent(부서이름);
                setVisible(false);
              } else {
                setShow((content) => ({
                  ...content,
                  show: true,
                }));
              }
            }}
          >
            저장
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Modal;
