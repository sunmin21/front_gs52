import React, { useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import Test from "src/components/main/Test";
import { useDispatch, useSelector } from "react-redux";
import { noticeAxios } from "src/modules/main/main";
import { useHistory } from "react-router-dom";
import { empAxios, teamAxios } from "src/modules/annual/memberSchedule";
const Project = () => {
  const Notice = React.lazy(() => import("src/components/main/notice/Notice"));
  const notice = useSelector((state) => state.main.notice);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(noticeAxios());
  }, [dispatch]);

  return (
    <>
      <CContainer>
        <CRow className="align-items-start">
          <CCol>
            <CButton
              color="danger"
              size="lg"
              className="m-2"
              onClick={() => {
                history.push("/schedule/project/create");
              }}
            >
              프로젝트 생성
            </CButton>
          </CCol>
        </CRow>
        <CRow className="align-items-center">
          <CCol>
            <Notice content={notice} />
          </CCol>

          <CCol>
            <Test />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default Project;
