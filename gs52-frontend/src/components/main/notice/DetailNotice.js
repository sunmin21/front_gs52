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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { DeleteNotice, UpdateNotice } from "src/lib/api/main/Main";

import { noticeAxios } from "src/modules/main/main";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const DetailNotice = (e) => {
  const user = getCurrentUser();

  const history = useHistory();
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);

  const notice = useSelector((state) => state.main.notice[0]);
  const titleInput = useRef();
  const contentInput = useRef();
  const [titlecheck, setTitleCheck] = useState(false);
  const [contentcheck, setContentCheck] = useState(false);
  const [content, setContent] = useState({
    emp_NAME: "",
    notice_CONTENTS: "",
    notice_DATE: "",
    notice_EMP_INDEX: "",
    notice_INDEX: "",
    notice_TITLE: "",
  });

  // if (notice["인덱스"] !== null) {
  //   setContent(notice);
  // }
  useEffect(() => {
    dispatch(noticeAxios(e.match.params.id));
  }, [dispatch, e.match.params.id]);
  useEffect(() => {
    setContent(notice);
  }, [notice]);

  const ChangeTitle = useCallback((e) => {
    setContent((content) => ({
      ...content,
      notice_TITLE: e.target.value,
    }));
  }, []);
  const ChangeContent = useCallback((e) => {
    setContent((content) => ({
      ...content,
      notice_CONTENTS: e.target.value,
    }));
  }, []);
  const contentStyle = {
    backgroundColor: "#3e4b54",
    width: "400px",
    textAlign: "center",
    boxShadow: "5px 5px 5px gray",
    padding: "8px",
    borderRadius: "50px",
    marginBottom: "30px",
  };
  return (
    <>
      {" "}
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>공지사항</h4>
      </div>
      <CCard>
        <CCardBody>
          <CForm
            action=""
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >
            <CFormGroup row>
              <CCol md="3">
                <CLabel style={{ marginTop: "3px" }}>글번호</CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <CInput
                  name="번호"
                  id="textarea-input"
                  rows="9"
                  placeholder="번호"
                  value={content.notice_INDEX || ""}
                  style={{ background: "white" }}
                  disabled
                />
              </CCol>
              <CCol md="2">
                <CLabel style={{ marginTop: "3px" }}>작성자</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CInput
                  name="작성자"
                  id="textarea-input"
                  rows="9"
                  placeholder="작성자"
                  value={content.emp_NAME || ""}
                  style={{ background: "white" }}
                  disabled
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
                  value={content.notice_TITLE || ""}
                  onChange={ChangeTitle}
                  style={{ background: "white" }}
                  innerRef={titleInput}
                  disabled
                />{" "}
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
                  placeholder="Content..."
                  value={content.notice_CONTENTS || ""}
                  onChange={ChangeContent}
                  style={{ background: "white" }}
                  innerRef={contentInput}
                  disabled
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

            <CFormGroup row>
              <CCol md="3">
                <CLabel style={{ marginTop: "3px" }}>등록날짜</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  name="등록날짜"
                  id="textarea-input"
                  rows="5"
                  placeholder="제목"
                  style={{ background: "white" }}
                  value={content.notice_DATE || ""}
                  disabled
                />
              </CCol>
            </CFormGroup>
            {notice.notice_EMP_INDEX === user.index && (
              <>
                {" "}
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  style={{ float: "right" }}
                  onClick={() => {
                    DeleteNotice(notice.notice_INDEX);
                    history.goBack();
                  }}
                >
                  <CIcon name="cil-ban" /> 삭제
                </CButton>
                <CButton
                  type="reset"
                  size="sm"
                  color="info"
                  style={{ float: "right" }}
                  onClick={() => {
                    setContent(notice);
                    setCheck(true);
                    setContentCheck(false);
                    setTitleCheck(false);
                    titleInput.current.disabled = false;

                    contentInput.current.disabled = false;
                  }}
                >
                  <CIcon name="cil-happy" /> 수정
                </CButton>
                {check && (
                  <CButton
                    type="reset"
                    size="sm"
                    color="success"
                    style={{ float: "right" }}
                    onClick={async () => {
                      if (content.notice_TITLE === "") {
                        setTitleCheck(true);
                        return;
                      }
                      if (content.notice_CONTENTS === "") {
                        setContentCheck(true);

                        return;
                      }

                      setContentCheck(false);
                      setTitleCheck(false);
                      setCheck(false);

                      titleInput.current.disabled = true;

                      contentInput.current.disabled = true;
                      await UpdateNotice(content);
                      await dispatch(noticeAxios(e.match.params.id));
                    }}
                  >
                    <CIcon name="cil-save" /> 저장
                  </CButton>
                )}
              </>
            )}
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton
            type="reset"
            size="sm"
            color="danger"
            style={{ float: "right" }}
            onClick={() => {
              setContentCheck(false);
              setTitleCheck(false);
              history.goBack();
            }}
          >
            <CIcon name="cil-ban" /> 돌아가기
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  );
};
export default React.memo(DetailNotice);
