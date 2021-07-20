import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CSelect,
  CCol,
  CInput,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroup,
  CLabel,
  CAlert,
} from "@coreui/react";
import "antd/dist/antd.css";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { Delete_Conf } from "src/lib/api/conf/ConfAPI";

import { useDispatch, useSelector } from "react-redux";

import { modalCheck2, ConfAxios } from "src/modules/schedule/conf";
const user = getCurrentUser();
export function ConfDetail() {
  const dispatch = useDispatch();

  const { conf_modal2, conf_one } = useSelector((state) => {
    return {
      conf_modal2: state.conf_check.conf_modal2,
      conf_one: state.conf_check.conf_one,
    };
  });
  const conf_data = conf_one.map((item) => ({
    conf_INDEX: item.conf_INDEX,
    conf_TITLE: item.conf_TITLE,
    conf_DATE: item.conf_DATE,
    conf_START: item.conf_START,
    conf_END: item.conf_END,
    conf_ROOM_INDEX: item.conf_ROOM_INDEX,
    conf_ROOM_FLOOR: item.conf_ROOM_FLOOR,
    conf_ROOM_NUMBER: item.conf_ROOM_NUMBER,
    conf_RE_EMP_INDEX: item.conf_RE_EMP_INDEX,
    emp_NAME: item.emp_NAME,
  }));

  const onCancle = (e) => {
    dispatch(modalCheck2());
  };

  const onDelete = async () => {
    await Delete_Conf(conf_data[0].conf_INDEX);
    await dispatch(ConfAxios());
    await dispatch(modalCheck2());
  };

  if (conf_data.length !== 0) {
    return (
      <div>
        <CModal
          show={conf_modal2}
          closeOnBackdrop={false}
          onClose={() => dispatch(modalCheck2())}
          color="secondary"
        >
          <CModalHeader closeButton>
            <CModalTitle>회의실 예약</CModalTitle>
          </CModalHeader>

          <CModalBody>
            <h4>회의실 예약</h4>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="first_pwd">회의실 제목</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {" "}
                {conf_data[0].conf_TITLE}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="first_pwd"></CLabel>
              </CCol>
              <CCol xs="12" md="4"></CCol>

              <CCol md="4"></CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="first_pwd">예약 시간</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {conf_data[0].conf_DATE}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="first_pwd">초대 인원</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {conf_data.map((item, key) => {
                  if (key === conf_data.length - 1) {
                    return item.emp_NAME;
                  } else {
                    return item.emp_NAME + ",";
                  }
                })}
              </CCol>
            </CFormGroup>
          </CModalBody>

          <CModalFooter>
            <CButton color="danger" onClick={onDelete}>
              삭제
            </CButton>{" "}
            <CButton color="secondary" onClick={onCancle}>
              취소
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    );
  } else {
    return <></>;
  }
}

export default ConfDetail;
