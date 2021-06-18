import React, { useState } from "react";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CLabel,
  CCol,
  CInput,
  CFormText,
} from "@coreui/react";
import { DocsLink } from "src/reusable";

const AnnualModal = ({ Content }) => {
  const [info, setInfo] = useState(false);

  return (
    <div className="modalHandler">
      <CButton block color="dark" onClick={() => setInfo(!info)}>
        직원 검색
      </CButton>

      <CModal show={info} onClose={() => setInfo(!info)} color="info">
        <CModalHeader>
          <CModalTitle>직원 검색</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Content />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setInfo(!info)}>
            취소
          </CButton>
          <CButton color="info" onClick={() => setInfo(!info)}>
            확인
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default AnnualModal;
