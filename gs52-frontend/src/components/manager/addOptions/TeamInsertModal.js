import {
  InsertTeam,
  SelectCheckTeam,
} from "src/lib/api/manager/addOptions/addOptions";
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
  setDoubleCheck,
  doubleCheck,
}) => {
  const [content, setContent] = useState({
    부서인덱스: 1,
    팀이름: "",
    근무유형: 1,
  });
  const [show, setShow] = useState(false);
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
              <CAlert
                color="danger"
                show={show2}
                closeButton
                onClick={() => {
                  setShow2(false);
                }}
              >
                이미 있는 팀입니다.
              </CAlert>
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
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              setContent({
                부서인덱스: 1,
                팀이름: "",
                근무유형: 1,
              });
              setShow(false);
              setDoubleCheck(true);
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={async () => {
              if (doubleCheck) {
                if (
                  (await (await SelectCheckTeam(content["팀이름"])).data) !== 0
                ) {
                  setShow2(true);
                  return;
                }
                if (content["팀이름"] === null || content["팀이름"] === "") {
                  setShow(true);
                  return;
                }
                InsertTeam(content);
                dispatch(axios());
                setContent({
                  부서인덱스: 1,
                  팀이름: "",
                  근무유형: 1,
                });
                setShow(false);
                setVisible(false);
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

export default React.memo(DeptInsertModal);
