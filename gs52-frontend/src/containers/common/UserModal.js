import React, { useEffect, useState } from "react";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSEARCHADD,
  searchConfirm,
  searchInit,
} from "src/modules/emp/emp";
import { changeBoard } from "src/modules/task/task";

const AnnualModal = ({ Content, no }) => {
  const [info, setInfo] = useState(false);

  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  useEffect(() => {
    dispatch(searchInit());
  }, [check, dispatch]);

  return (
    <div className="modalHandler">
      <CButton
        block
        color="dark"
        // eslint-disable-next-line no-sequences
        onClick={() => (setInfo(!info), setCheck(!check))}
      >
        직원 검색
      </CButton>

      <CModal show={info} onClose={() => setInfo(!info)} color="info">
        <CModalHeader>
          <CModalTitle>직원 검색</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Content check={check} no={no} />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setInfo(!info);
              dispatch(searchInit());
            }}
          >
            취소
          </CButton>
          <CButton
            color="info"
            onClick={() => {
              dispatch(searchConfirm());
              setInfo(!info);
            }}
          >
            확인
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default AnnualModal;
