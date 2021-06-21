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
import { changeSEARCH } from "src/modules/emp";
import { changeBoard } from "src/modules/task";

const AnnualModal = ({ Content, form }) => {
  const [info, setInfo] = useState(false);
  const { search } = useSelector(({ emp }) => ({
    search: emp.search,
  }));
  const { board } = useSelector(({ task }) => ({
    board: task.board,
  }));

  const dispatch = useDispatch();

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
          <CButton
            color="secondary"
            onClick={() => (
              setInfo(!info),
              dispatch(
                changeSEARCH({
                  form: "search",

                  사원번호: "",
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

                    사원번호: search.사원번호,
                    이름: search.이름,
                    요청사항: board.요청사항,
                    첨부파일: board.첨부파일,
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
