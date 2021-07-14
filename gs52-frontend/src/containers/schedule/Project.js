import React, { useEffect } from "react";
import {
  CButton,
  CCardGroup,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import { useDispatch } from "react-redux";
import { noticeAxios } from "src/modules/main/main";
import { useHistory } from "react-router-dom";
import ShowProject from 'src/components/shedule/project/ShowProject';

const Project = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(noticeAxios());
  }, [dispatch]);

  return (
    <>
    <div style={{ backgroundColor:"lightsalmon" }}>
        <h3>프로젝트 목록</h3>
    </div>
    <CContainer>
        <CCardBody style={{ textAlign: "right", margin:"0"}}>
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
        </CCardBody>            
            <CCardBody style={{ textAlign: "center"}}>
              <ShowProject />
            </CCardBody>
      </CContainer>
      </>
  );
};

export default Project;
