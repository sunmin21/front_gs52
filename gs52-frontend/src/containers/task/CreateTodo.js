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
import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
import modalcontent from "../../components/task/BusinessProgress/Search";
const CreateTodo = () => {
  const { search } = useSelector(({ emp }) => ({
    search: emp.search,
  }));
  const { board } = useSelector(({ task }) => ({
    board: task.board,
  }));
  const history = useHistory();
  const no = useRef([]);
  no.current = search.map((content) => {
    return content.사원번호;
  });

  const dispatch = useDispatch();
  const [searchCheck, setSearchCheck] = useState(false);

  const [boardCheck, setBoardCheck] = useState(false);
  console.log(board);
  return (
    <>
      <CCard>
        <CCardHeader>요청사항</CCardHeader>
        <CCardBody>
          <CForm
            action=""
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">직원이름</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInputGroup style={{ float: "right" }}>
                  <div style={{ float: "right", textAlign: "center" }}>
                    <CInput
                      id="input1-group2"
                      name="input1-group2"
                      //   placeholder="Username"
                      style={{ width: "80%" }}
                      value={
                        search[0]
                          ? search.length === 1
                            ? search[0]["이름"]
                            : search[0]["이름"] +
                              "외 " +
                              (search.length - 1) +
                              "명"
                          : ""
                      }
                      disabled
                    />
                  </div>
                  <CInputGroupPrepend>
                    <Modal Content={modalcontent} form="board" />
                  </CInputGroupPrepend>
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">요청사항</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="요청사항"
                  id="textarea-input"
                  rows="9"
                  placeholder="Content..."
                  value={board}
                  onChange={(e) => {
                    dispatch(
                      changeBoard({
                        form: "board",

                        요청사항: e.target.value,
                      })
                    );
                  }}
                />
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          {searchCheck && (
            <CAlert
              color="danger"
              closeButton
              onClick={() => {
                setSearchCheck(false);
              }}
            >
              사용자를 선택해주세요
            </CAlert>
          )}
          {boardCheck && (
            <CAlert
              color="danger"
              closeButton
              onClick={() => {
                setBoardCheck(false);
              }}
            >
              내용을 입력해주세요
            </CAlert>
          )}

          <CButton
            type="submit"
            size="sm"
            color="primary"
            onClick={async () => {
              if (search.length === 0) {
                setSearchCheck(true);

                return;
              }

              if (board === undefined || board === "") {
                setBoardCheck(true);

                return;
              }
              await BoardSend({ no, board, sendId: 2 });
              dispatch(searchInit());
              dispatch(boardInit());
              await dispatch(todoAxios(2));
              await dispatch(sendAxios(2));
              await dispatch(succssAxios(2));
              history.goBack();
            }}
          >
            <CIcon name="cil-scrubber" /> Submit
          </CButton>
          <CButton
            type="reset"
            size="sm"
            color="danger"
            onClick={() => {
              dispatch(searchInit());
              dispatch(boardInit());
            }}
          >
            <CIcon name="cil-ban" /> Reset
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default CreateTodo;
