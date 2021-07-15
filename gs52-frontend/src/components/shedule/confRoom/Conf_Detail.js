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
import {getCurrentUser} from "src/lib/api/jwt/LoginAPI";

import { useDispatch, useSelector } from "react-redux";


import {
  modalCheck2
} from "src/modules/schedule/conf";

const user = getCurrentUser();

export function ConfDetail() {
  const dispatch = useDispatch();
  const { conf_modal2,conf_one} =
    useSelector((state) => {
     // console.log("state");
     // console.log(state);
      return {
        conf_modal2: state.conf_check.conf_modal2,
        conf_one:state.conf_check.conf_one,
      };
    });


    const conf_data = conf_one.map((item) => ({
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

  //등록 버튼 클릭 이벤트 함수
  const onRegist = async() => {
    dispatch(modalCheck2());
  };
  const onCancle = (e) => {
    dispatch(modalCheck2());
  };


if(conf_data!=null){
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
                  </CCol>
          </CFormGroup>


          <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="first_pwd"></CLabel>
                  </CCol>
                  <CCol xs="12" md="4">


                  </CCol>

				  <CCol md="4">

                  </CCol>
          </CFormGroup>
				
          <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="first_pwd">예약 시간</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
					
                  </CCol>
          </CFormGroup>
				
			
		  <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="first_pwd">초대 인원</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  </CCol>
          </CFormGroup>	

        </CModalBody>

        <CModalFooter>
          <CButton color="primary" onClick={onRegist}>
            등록
          </CButton>{" "}
          <CButton color="secondary" onClick={onCancle}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
else{
    <></>
}
}

export default ConfDetail;