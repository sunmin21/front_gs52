import {
  InsertDept,
  SelectCheckDept,
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
const { useState } = require("react");

const DeptInsertModal = ({
  visible,
  setVisible,
  dispatch,
  axios,
  doubleCheck,
  setDoubleCheck,
}) => {
  const [content, setContent] = useState("");
  const [show, setShow] = useState({
    show: false,
    index: 0,
  });
  const [show2, setShow2] = useState(false);

  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>추가</CModalTitle>
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
                내용을 입력하세요.
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
              setDoubleCheck(true);
              setContent("");
            }}
          >
            닫기
          </CButton>
          <CButton
            color="primary"
            onClick={async () => {
              if (doubleCheck) {
                if ((await (await SelectCheckDept(content)).data) !== 0) {
                  setShow2(true);
                  return;
                }
                if (content === "") {
                  setShow((content) => ({
                    ...content,
                    show: true,
                  }));
                } else {
                  await InsertDept(content);
                  await dispatch(axios());
                  setContent("");
                  setVisible(false);
                }
                setDoubleCheck(false);
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

export default DeptInsertModal;
