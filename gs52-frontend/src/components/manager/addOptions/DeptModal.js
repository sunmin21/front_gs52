import {
  SelectCheckDept,
  UpdateDept,
} from "src/lib/api/manager/addOptions/addOptions";

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
const { useState, default: React } = require("react");

const Modal = ({
  index,
  visible,
  setVisible,
  dispatch,
  axios,
  부서이름,
  content,
  setContent,
}) => {
  const [show, setShow] = useState({
    show: false,
    index: 0,
  });
  const [show2, setShow2] = useState(false);
  // const [content, setContent] = useState(부서이름);

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
                value={content || ""}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
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
                내용을 입력해주세요.
              </CAlert>
              <CAlert
                color="danger"
                show={show2}
                closeButton
                onClick={() => {
                  setShow2(false);
                }}
              >
                이미 있는 부서입니다.
              </CAlert>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              setContent(부서이름);
              setShow((content) => ({
                ...content,
                show: false,
              }));
              setShow2(false);
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={async () => {
              if (
                부서이름 !== content &&
                (await (await SelectCheckDept(content)).data) !== 0
              ) {
                setShow2(true);
                return;
              }
              if (content !== "") {
                await UpdateDept(index, content);
                await dispatch(axios());
                setContent(content);
                setVisible(false);
                setShow((content) => ({
                  ...content,
                  show: false,
                }));
                setShow2(false);
              } else {
                setShow((content) => ({
                  ...content,
                  show: true,
                }));
                setShow2(false);
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
