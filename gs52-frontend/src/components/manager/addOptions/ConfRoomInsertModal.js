import {
  InsertConfROOM,
  SelectCheckConfRoom,
} from "src/lib/api/manager/addOptions/addOptions";
import React, { useCallback, useState } from "react";
import { TimePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
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
  worktype,
  doubleCheck,
  setDoubleCheck,
}) => {
  const [content, setContent] = useState({
    층: "",
    호수: "",
    인덱스: "",
  });

  const [show, setShow] = useState(false);

  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>추가</CModalTitle>
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
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
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
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              setContent({
                층: "",
                호수: "",
                인덱스: "",
              });
              setShow2(false);
              setDoubleCheck(false);
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={async () => {
              if (doubleCheck) {
                if (
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
                console.log(content);
                InsertConfROOM(content);

                dispatch(axios());
                setContent({
                  층: "",
                  호수: "",
                  인덱스: "",
                });

                setVisible(false);
                setShow2(false);
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
