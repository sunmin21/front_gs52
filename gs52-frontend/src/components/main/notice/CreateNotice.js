import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CLabel,
  CTextarea,
} from "@coreui/react";
import React, { useCallback, useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { setContext } from "redux-saga/effects";

import { InsertNotice } from "src/lib/api/main/Main";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
const DetailNotice = (e) => {
  const history = useHistory();

  const user = getCurrentUser();
  const [content, setContent] = useState({
    인덱스: "",
    제목: "",
    내용: "",
    작성자INDEX: user.index,
    작성자: "",
    등록날짜: "",
  });
  const [titlecheck, setTitleCheck] = useState(false);
  const [contentcheck, setContentCheck] = useState(false);

  const ChangeTitle = useCallback((e) => {
    setContent((content) => ({
      ...content,
      제목: e.target.value,
    }));
  }, []);
  const ChangeContent = useCallback((e) => {
    setContent((content) => {
      return {
        ...content,
        내용: e.target.value,
      };
    });
  }, []);
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
      <CCard>
        <CCardHeader>
          {" "}
          <div style={contentStyle}>
            <h4 style={{ color: "white", marginTop: "5px" }}>공지사항</h4>
          </div>
        </CCardHeader>
        <CCardBody>
          <CForm
            action=""
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >
            <CFormGroup row>
              <CCol md="3">
                <CLabel style={{ marginTop: "3px" }}>작성자</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CInput
                  name="작성자"
                  id="textarea-input"
                  rows="9"
                  placeholder="작성자"
                  value={user.username}
                  readOnly
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel style={{ marginTop: "3px" }}>제목</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  name="제목"
                  id="textarea-input"
                  rows="5"
                  placeholder="제목"
                  onChange={ChangeTitle}
                  value={content.제목}
                />
                {titlecheck && (
                  <CAlert
                    color="danger"
                    closeButton
                    onClick={() => {
                      setTitleCheck(false);
                    }}
                  >
                    제목을 입력하세요
                  </CAlert>
                )}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel style={{ marginTop: "3px" }}>내용</CLabel>
              </CCol>

              <CCol xs="12" md="9">
                <CTextarea
                  name="내용"
                  id="textarea-input"
                  rows="9"
                  placeholder="내용..."
                  onChange={ChangeContent}
                  value={content.내용}
                />
                {contentcheck && (
                  <CAlert
                    color="danger"
                    closeButton
                    onClick={() => {
                      setContentCheck(false);
                    }}
                  >
                    내용을 입력하세요
                  </CAlert>
                )}
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton
            type="reset"
            size="sm"
            color="danger"
            style={{ float: "right" }}
            onClick={useCallback(() => {
              setContent({
                인덱스: "",
                제목: "",
                내용: "",
                작성자INDEX: "",
                작성자: "",
                등록날짜: "",
              });
              setContentCheck(false);
              setTitleCheck(false);
              history.goBack();
            }, [history])}
          >
            <CIcon name="cil-ban" /> 취소
          </CButton>
          <CButton
            type="submit"
            size="sm"
            color="primary"
            style={{ float: "right" }}
            onClick={useCallback(() => {
              if (content.제목 === "") {
                setTitleCheck(true);
                return;
              }
              if (content.내용 === "") {
                setContentCheck(true);
                return;
              }

              InsertNotice(content);

              setContentCheck(false);
              setTitleCheck(false);
              history.goBack();
            }, [content, history])}
          >
            <CIcon name="cil-scrubber" /> 등록
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default React.memo(DetailNotice);
