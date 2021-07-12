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
import {
  businesscountAxios,
  entrydateAxios,
  worktimeAxios,
  projectcountAxios,
  reportcountAxios,
  todocountAxios,
} from "src/modules/annual/personInsight";

const PersonInsightList = (props) => {
  console.log(props.EMP_INDEX);
  const dispatch = useDispatch();
  const {
    entrydate,
    projectcount,
    todocount,
    businesscount,
    reportcount,
    worktime,
  } = useSelector((state) => {
    return {
      entrydate: state.personInsight.entrydate,
      projectcount: state.personInsight.projectcount,
      todocount: state.personInsight.todocount,
      businesscount: state.personInsight.businesscount,
      reportcount: state.personInsight.reportcount,
      worktime: state.personInsight.worktime,
    };
  });

  useEffect(() => {
    dispatch(entrydateAxios(props.EMP_INDEX));

    dispatch(projectcountAxios(props.EMP_INDEX));
    dispatch(todocountAxios(props.EMP_INDEX));
    dispatch(businesscountAxios(props.EMP_INDEX));
    dispatch(reportcountAxios(props.EMP_INDEX));
    dispatch(worktimeAxios(props.EMP_INDEX));
  }, [dispatch, props.EMP_INDEX]);

  console.log(projectcount);
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
              {entrydate.length !== 0 ? (
                <CCardText>
                  <h3 style={{ textAlign: "right" }}>
                    입사일 : {entrydate[0].emp_ENTRY_DATE}
                  </h3>
                  <h3 style={{ textAlign: "right" }}>
                    {entrydate[0].emp_ENTRY_COUNT}일
                  </h3>
                </CCardText>
              ) : null}
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
              {worktime.length !== 0 ? (
                <CCardText>
                  <h3 style={{ textAlign: "right" }}>
                    {Math.floor(worktime[0].emp_WORK_TIME / 60)}시간{" "}
                    {worktime[0].emp_WORK_TIME % 60}분
                  </h3>
                </CCardText>
              ) : null}
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
              {projectcount.length !== 0 ? (
                <CCardText>
                  <h3 style={{ textAlign: "right" }}>
                    {projectcount[0].emp_PROJECT_COUNT}개
                  </h3>
                </CCardText>
              ) : null}
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
              {todocount.length !== 0 ? (
                <CCardText>
                  <h3 style={{ textAlign: "right" }}>
                    {todocount[0].emp_TODO_COUNT}개
                  </h3>
                </CCardText>
              ) : null}
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
              {businesscount.length !== 0 ? (
                <CCardText>
                  <h3 style={{ textAlign: "right" }}>
                    {businesscount[0].emp_BUSINESS_COUNT}회
                  </h3>
                </CCardText>
              ) : null}
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
              {reportcount.length !== 0 ? (
                <CCardText>
                  <h3 style={{ textAlign: "right" }}>
                    {reportcount[0].emp_REPORT_COUNT}회
                  </h3>
                </CCardText>
              ) : null}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default React.memo(PersonInsightList);
