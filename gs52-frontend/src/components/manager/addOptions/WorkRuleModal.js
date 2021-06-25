import { UpdateTeam } from "src/lib/api/manager/addOptions/addOptions";
import React, { useState } from "react";
import { TimePicker } from "antd";
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
  worktype,
  work_TYPE_INDEX,
  work_rule_name,
}) => {
  const [content, setContent] = useState({
    work_TYPE_INDEX: work_TYPE_INDEX,
    index: index,
    WORK_RULE_NAME: "",
    work_TYPE_INDEX: work_TYPE_INDEX,
    work_rule_name: work_rule_name,
    starttime: 0,
  });
  const [show, setShow] = useState(false);
  const [time, setTime] = useState();
  function onTime(timeString) {
    setTime(timeString);
  }
  console.log(time);
  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>종류</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CSelect
                custom
                size="lg"
                name="selectLg"
                id="selectLg"
                value={content["work_TYPE_INDEX"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    work_TYPE_INDEX: e.target.value,
                  }));
                }}
              >
                {worktype.map((item) => (
                  <option
                    key={item.work_TYPE_INDEX}
                    value={item.work_TYPE_INDEX}
                  >
                    {item.work_TYPE_NAME}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>근무이름</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CInput
                placeholder="근무이름"
                value={content["work_rule_name"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    work_rule_name: e.target.value,
                  }));
                }}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>출/퇴근시간</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <TimePicker.RangePicker onChange={onTime} />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>평균근무시간</CLabel>
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
                work_TYPE_INDEX: work_TYPE_INDEX,
                index: index,
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
                  work_TYPE_INDEX: work_TYPE_INDEX,
                  index: index,
                });
                setVisible(false);
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
