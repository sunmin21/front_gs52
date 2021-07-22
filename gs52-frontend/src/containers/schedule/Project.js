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
import ShowProject from "src/components/shedule/project/ShowProject";

const Project = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(noticeAxios());
  }, [dispatch]);

  const contentStyle = {
    backgroundColor: "#3e4b54",
    width: "400px",
    textAlign: "center",
    boxShadow: "5px 5px 5px gray",
    padding: "8px",
    borderRadius: "50px",
  };
  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>나의 프로젝트 목록</h4>
      </div>
      <CCol style={{ textAlign: "right" }}>
        <CButton
          color="danger"
          size="lg"
          className="m-2"
          onClick={() => {
            history.push("/task/project/create");
          }}
        >
          프로젝트 생성
        </CButton>
      </CCol>
      <div style={{ textAlign: "center" }}>
        <ShowProject />
      </div>
    </>
  );
};

export default React.memo(Project);
