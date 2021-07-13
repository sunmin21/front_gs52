import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup,
  CCol,
  CLabel,
  CCardFooter,
  CButton,
  CSelect,
  CInputFile,
  CAlert,
} from "@coreui/react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

export function InformChange() {
 
  return (
    <div>
      <CCard>
        <CCardHeader>회원정보 수정</CCardHeader>
        <CCardBody>
         
      
        </CCardBody>

        <CCardFooter>
        
        </CCardFooter>
      </CCard>
    </div>
  );
}

export default InformChange;
