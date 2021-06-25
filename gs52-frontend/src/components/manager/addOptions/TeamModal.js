import { UpdateTeam } from "src/lib/api/manager/addOptions/addOptions";
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
  CSelect,
  CCol,
  CFormGroup,
  CAlert,
} = require("@coreui/react");

const Modal = ({
  index,
  visible,
  setVisible,
  dispatch,
  axios,
  workrule,
  work_RULE_INDEX,
  teamName,
  content,
  setContent,
}) => {
  // const [content, setContent] = useState({
  //   teamname: teamName,
  //   work_RULE_INDEX: work_RULE_INDEX,
  //   index: index,
  // });
  const [show, setShow] = useState(false);

  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>팀이름</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CInput
                placeholder="팀명"
                value={content["teamname"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    teamname: e.target.value,
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
                내용을 입력하세요.
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
                value={content["work_RULE_INDEX"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    work_RULE_INDEX: e.target.value,
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
              setShow(false);
              setContent({
                teamname: teamName,
                work_RULE_INDEX: work_RULE_INDEX,
              });
            }}
          >
            Close
          </CButton>

          <CButton
            color="primary"
            onClick={() => {
              if (content["teamname"] !== "" && content["teamname"] !== null) {
                UpdateTeam(content);
                dispatch(axios());
                setContent({
                  teamname: teamName,
                  work_RULE_INDEX: work_RULE_INDEX,
                });
                setVisible(false);
                setShow(false);
              } else {
                setShow(true);
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

export default React.memo(Modal);
