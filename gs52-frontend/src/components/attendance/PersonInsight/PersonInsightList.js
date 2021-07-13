import {
  CCallout,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";

const PersonInsightList = (props) => {
  // console.log(props.personinsight[0].emp_ENTRY_COUNT);
  // console.log(props.personinsight[0].emp_ENTRY_DATE);
  // console.log(props.personinsight[0].emp_PROJECT_COUNT);
  // console.log(props.personinsight[0].emp_REPORT_COUNT);
  // console.log(props.personinsight[0].emp_TODO_COUNT);
  // console.log(props.personinsight[0].emp_BUSINESS_COUNT);
  // console.log(props.personinsight[0].emp_WORK_TIME);

  return (
    <>
      <CRow style={{ marginTop: "30px" }}>
        <CCol xs="12" xl="4">
          <CCard
            accentColor="info"
            style={{ maxWidth: "30rem", maxHeight: "30rem" }}
          >
            <CCardHeader>
              <CRow>
                <CCol xl="2">
                  <CIcon name="cil-sun" size="2xl"></CIcon>
                </CCol>
                <CCol>
                  {" "}
                  <h3>근속 일수</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {
                <CCardText>
                  <h3 style={{ textAlign: "right" }}>
                    입사일 : {props.personinsight[0].emp_ENTRY_DATE}
                  </h3>
                  <h3 style={{ textAlign: "right" }}>
                    {props.personinsight[0].emp_ENTRY_COUNT}일
                  </h3>
                </CCardText>
              }
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" xl="4">
          <CCard
            accentColor="info"
            style={{ maxWidth: "30rem", maxHeight: "30rem" }}
          >
            <CCardHeader>
              <CRow>
                <CCol xl="2">
                  <CIcon name="cil-home" size="2xl"></CIcon>
                </CCol>
                <CCol>
                  {" "}
                  <h3>평균 근무 시간</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <h3 style={{ textAlign: "right" }}>
                  {Math.floor(props.personinsight[0].emp_WORK_TIME / 60)}시간{" "}
                  {Math.floor(props.personinsight[0].emp_WORK_TIME % 60)}분
                </h3>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="18" xl="4">
          <CCard accentColor="info" style={{ Width: "30rem" }}>
            <CCardHeader>
              <CRow>
                <CCol xl="2">
                  <CIcon name="cil-list" size="2xl"></CIcon>
                </CCol>
                <CCol>
                  {" "}
                  <h3>프로젝트 참여</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <h3 style={{ textAlign: "right" }}>
                  {props.personinsight[0].emp_PROJECT_COUNT}개
                </h3>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow style={{ marginTop: "30px" }}>
        <CCol xs="18" xl="4">
          <CCard accentColor="info" style={{ Width: "30rem" }}>
            <CCardHeader>
              <CRow>
                <CCol xl="2">
                  <CIcon name="cil-task" size="2xl"></CIcon>
                </CCol>
                <CCol>
                  {" "}
                  <h3>할일 완료</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <h3 style={{ textAlign: "right" }}>
                  {props.personinsight[0].emp_TODO_COUNT}개
                </h3>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="18" xl="4">
          {" "}
          <CCard accentColor="info" style={{ maxWidth: "30rem" }}>
            <CCardHeader>
              <CRow>
                <CCol xl="2">
                  <CIcon name="cil-settings" size="2xl"></CIcon>
                </CCol>
                <CCol>
                  {" "}
                  <h3>출장 / 외근</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <h3 style={{ textAlign: "right" }}>
                  {props.personinsight[0].emp_BUSINESS_COUNT}회
                </h3>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="18" xl="4">
          {" "}
          <CCard accentColor="info" style={{ maxWidth: "30rem" }}>
            <CCardHeader>
              <CRow>
                <CCol xl="2">
                  <CIcon name="cil-cursor" size="2xl"></CIcon>
                </CCol>
                <CCol>
                  {" "}
                  <h3>주간 보고</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <h3 style={{ textAlign: "right" }}>
                  {props.personinsight[0].emp_REPORT_COUNT}회
                </h3>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default React.memo(PersonInsightList);
