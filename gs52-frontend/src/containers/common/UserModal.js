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
import { changeSEARCHADD, searchInit } from "src/modules/emp";
import { changeBoard } from "src/modules/task";

const AnnualModal = ({ Content, form }) => {
  const [info, setInfo] = useState(false);

  const dispatch = useDispatch();
  const { search } = useSelector(({ emp }) => ({
    search: emp.search,
  }));
  const { board } = useSelector(({ task }) => ({
    board: task.board,
  }));
  const [check, setCheck] = useState(false);
  useEffect(() => {
    dispatch(searchInit());
  }, [check]);

  return (
    <div className="modalHandler">
      <CButton
        block
        color="dark"
        onClick={() => (setInfo(!info), setCheck(!check))}
      >
        직원 검색
      </CButton>

      <CModal show={info} onClose={() => setInfo(!info)} color="info">
        <CModalHeader>
          <CModalTitle>직원 검색</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Content check={check} />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => (
              setInfo(!info),
              dispatch(
                changeSEARCHADD({
                  form: "search",

                  사원번호: [],
                  이름: "",
                  부서: "",
                  팀: "",
                  직책: "",
                })
              )
            )}
          >
            취소
          </CButton>
          <CButton
            color="info"
            onClick={() => {
              return (
                setInfo(!info),
                dispatch(
                  changeBoard({
                    form: form,

                    search: search,
                  })
                )
              );
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
