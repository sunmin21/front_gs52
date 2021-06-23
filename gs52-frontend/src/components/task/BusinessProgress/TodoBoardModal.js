import React, { useEffect, useState } from "react";

import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import Content from "./TodoBoardContent";
const AnnualModal = ({ form, info, setInfo }) => {
  return (
    <div className="modalHandler">
      <CModal show={info} onClose={() => setInfo(!info)} color="info">
        <CModalHeader>
          <CModalTitle>상세보기</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Content></Content>
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  );
};

export default AnnualModal;
