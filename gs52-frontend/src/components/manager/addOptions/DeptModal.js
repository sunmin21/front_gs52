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
} = require("@coreui/react");
const { useState } = require("react");

const Modal = ({ index, visible, setVisible, dispatch, axios }) => {
  const [content, setContent] = useState("");
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
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              setContent("");
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              UpdateDept(index, content);
              dispatch(axios());
              setContent("");
              setVisible(false);
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
