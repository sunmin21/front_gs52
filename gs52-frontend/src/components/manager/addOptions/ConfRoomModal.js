import {
  UpdateConfRoom,
  SelectCheckConfRoom,
} from "src/lib/api/manager/addOptions/addOptions";
import React, { useCallback, useState } from "react";
import { TimePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

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
  content,
  setContent,
  층,
  호수,
}) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>층</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CInput
                placeholder="층"
                autoComplete="email"
                value={content["층"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    층: e.target.value,
                  }));
                }}
              />
            </CCol>
            <CAlert
              color="danger"
              show={show2}
              closeButton
              onClick={() => {
                setShow2(false);
              }}
            >
              층: 숫자만입력해주세요
            </CAlert>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>호수</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CInput
                placeholder="부서명"
                autoComplete="email"
                value={content["호수"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    호수: e.target.value,
                  }));
                }}
              />
            </CCol>
            <CAlert
              color="danger"
              show={show3}
              closeButton
              onClick={() => {
                setShow3(false);
              }}
            >
              호수: 숫자만입력해주세요
            </CAlert>
            <CAlert
              color="danger"
              show={show2}
              closeButton
              onClick={() => {
                setShow2(false);
              }}
            >
              이미 존재하는 회의실입니다.
            </CAlert>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
            }}
          >
            Close
          </CButton>

          <CButton
            color="primary"
            onClick={async () => {
              if (isNaN(content["층"]) || content["층"] === "") {
                setShow(true);
                return;
              }
              if (isNaN(content["호수"]) || content["호수"] === "") {
                setShow3(true);
                return;
              }
              if (
                층 + "" + 호수 !== content["층"] + "" + content["호수"] &&
                (await (
                  await SelectCheckConfRoom({
                    층: content["층"],
                    호수: content["호수"],
                  })
                ).data) !== 0
              ) {
                setShow2(true);
                return;
              }
              await UpdateConfRoom(content);
              await dispatch(axios());

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

export default React.memo(Modal);
