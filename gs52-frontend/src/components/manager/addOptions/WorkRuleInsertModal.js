import {
  InsertWorkRule,
  SelectCheckRule,
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
}) => {
  const [content, setContent] = useState({
    work_type_index: 1,
    index: "",
    work_rule_name: "",
    starttime: "09:00",
    endtime: "18:00",
    work_rule_avg_time: "",
    breaktime: "01:00",
  });

  const [show, setShow] = useState(false);

  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const onTime = useCallback((timeString) => {
    setContent((content) => ({
      ...content,
      starttime: moment(timeString[0]).format("HH:mm"),
      endtime: moment(timeString[1]).format("HH:mm"),
    }));
  }, []);
  const onTime2 = useCallback((timeString) => {
    setContent((content) => ({
      ...content,
      breaktime: moment(timeString).format("HH:mm"),
    }));
  }, []);
  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>추가</CModalTitle>
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
                value={content["work_type_index"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    work_type_index: e.target.value,
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
              <CAlert
                color="danger"
                show={show3}
                closeButton
                onClick={() => {
                  setShow3(false);
                }}
              >
                이미 있는 근무이름입니다.
              </CAlert>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>출/퇴근시간</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <TimePicker.RangePicker
                onChange={onTime}
                format="HH:mm"
                minuteStep={10}
                defaultValue={[
                  moment("09:00", "HH:mm"),
                  moment("18:00", "HH:mm"),
                ]}
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>평균근무시간</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <CInput
                placeholder="평균근무시간"
                value={content["work_rule_avg_time"]}
                onChange={(e) => {
                  setContent((content) => ({
                    ...content,
                    work_rule_avg_time: e.target.value,
                  }));
                }}
              />
              <CAlert
                color="danger"
                show={show2}
                closeButton
                onClick={() => {
                  setShow2(false);
                }}
              >
                숫자만입력해주세요
              </CAlert>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel style={{ margin: "5px" }}>휴게시간</CLabel>
            </CCol>
            <CCol xs="12" md="9" size="lg">
              <TimePicker
                format="HH:mm"
                minuteStep={30}
                defaultValue={moment("01:00", "HH:mm")}
                onChange={onTime2}
              />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false);
              setContent({
                work_type_index: 1,
                index: "",
                work_rule_name: "",
                starttime: "09:00",
                endtime: "18:00",
                work_rule_avg_time: "",
                breaktime: "01:00",
              });
              setShow(false);
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={async () => {
              if (
                (await (
                  await SelectCheckRule(content["work_rule_name"])
                ).data) !== 0
              ) {
                setShow3(true);
                return;
              }
              if (
                content["work_rule_name"] === "" ||
                content["work_rule_name"] === null
              ) {
                setShow(true);
                return;
              }
              if (
                isNaN(content["work_rule_avg_time"]) ||
                content["work_rule_avg_time"] === ""
              ) {
                setShow2(true);
                return;
              }
              InsertWorkRule(content);

              dispatch(axios());
              setContent({
                work_type_index: 1,
                index: "",
                work_rule_name: "",
                starttime: "09:00",
                endtime: "18:00",
                work_rule_avg_time: "",
                breaktime: "01:00",
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
