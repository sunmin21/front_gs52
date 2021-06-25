import { InsertTeam } from "src/lib/api/manager/addOptions/addOptions";
import React, { useState } from "react";
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
  CSelect,
} = require("@coreui/react");

const DeptInsertModal = ({
  visible,
  setVisible,
  dispatch,
  axios,
  workrule,
  dept,
}) => {
  const [content, setContent] = useState({
    부서인덱스: 1,
    팀이름: "",
    근무유형: 1,
  });
  const [show, setShow] = useState(false);

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
              <CSelect
                custom
                size="lg"
                name="selectLg"
                id="selectLg"
                value={content["부서인덱스"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    부서인덱스: e.target.value,
                  }));
                }}
              >
                {dept.map((item) => (
                  <option key={item.dept_INDEX} value={item.dept_INDEX}>
                    {item.dept_NAME}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>팀이름</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CInput
                placeholder="팀명"
                value={content["팀이름"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    팀이름: e.target.value,
                  }));
                }}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>근무유형</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CSelect
                custom
                size="lg"
                name="selectLg"
                id="selectLg"
                value={content["근무유형"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    근무유형: e.target.value,
                  }));
                }}
              >
                {workrule.map((item) => (
                  <option
                    key={item.work_RULE_INDEX}
                    value={item.work_RULE_INDEX}
                  >
                    {item.work_RULE_NAME}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CAlert
            color="danger"
            show={show}
            closeButton
            onClick={() => {
              setShow(false);
            }}
          >
            모든 내용을 기입해주세요.
          </CAlert>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              setContent({
                부서인덱스: 1,
                팀이름: "",
                근무유형: 1,
              });
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              InsertTeam(content);
              dispatch(axios());
              setContent({
                부서인덱스: 1,
                팀이름: "",
                근무유형: 1,
              });
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

export default React.memo(DeptInsertModal);
