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
import React, { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import Modal from "src/containers/common/UserModal";
import { BoardSend } from "src/lib/api/task/BusinessProgress";
import { searchInit } from "src/modules/emp/emp";
import {
  boardInit,
  changeBoard,
  sendAxios,
  succssAxios,
  todoAxios,
} from "src/modules/task/task";
import styled from "styled-components";
import modalcontent from "../../task/BusinessProgress/Search";
const DetailNotice = (e) => {
  const location = useLocation();
  console.log(location.state.item);

  const [searchCheck, setSearchCheck] = useState(false);

  const [boardCheck, setBoardCheck] = useState(false);
  const Style = styled.div`
    & :disabled {
      background-color: white;
    }
  `;

  return (
    <>
      <CCard>
        <CCardHeader>공지사항</CCardHeader>
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
                <Style>
                  <CInput
                    name="번호"
                    id="textarea-input"
                    rows="9"
                    placeholder="번호"
                    value={location.state.item.인덱스}
                    disabled
                  />
                </Style>
              </CCol>
              <CCol md="2">
                <CLabel style={{ marginTop: "3px" }}>작성자</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <Style>
                  <CInput
                    name="작성자"
                    id="textarea-input"
                    rows="9"
                    placeholder="작성자"
                    value={location.state.item.작성자}
                    disabled
                  />
                </Style>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel style={{ marginTop: "3px" }}>제목</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <Style>
                  <CInput
                    name="제목"
                    id="textarea-input"
                    rows="5"
                    placeholder="제목"
                    value={location.state.item.제목}
                    disabled
                  />
                </Style>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel style={{ marginTop: "3px" }}>내용</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <Style>
                  <CTextarea
                    name="내용"
                    id="textarea-input"
                    rows="9"
                    placeholder="Content..."
                    value={location.state.item.내용}
                    disabled
                  />
                </Style>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel style={{ marginTop: "3px" }}>등록날짜</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <Style>
                  <CInput
                    name="등록날짜"
                    id="textarea-input"
                    rows="5"
                    placeholder="제목"
                    value={location.state.item.등록날짜}
                    disabled
                  />
                </Style>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  );
};

export default React.memo(DetailNotice);
