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

import Modal from "src/containers/common/UserModal";
import { BoardSend } from "src/lib/api/task/BusinessProgress";
import { searchInit } from "src/modules/emp";
import { boardInit, changeBoard } from "src/modules/task";
import modalcontent from "../../components/task/BusinessProgress/Search";
const CreateTodo = () => {
  const { search } = useSelector(({ emp }) => ({
    search: emp.search,
  }));
  const { board } = useSelector(({ task }) => ({
    board: task.board,
  }));
  const no = useRef([]);
  no.current = search.map((content) => {
    return content.사원번호;
  });

  const dispatch = useDispatch();
  const [searchCheck, setSearchCheck] = useState(false);

  const [boardCheck, setBoardCheck] = useState(false);
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
                          ? search[0]["이름"] +
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

            {/* <CFormGroup row>
              <CCol md="3">
                <CLabel>Multiple File input</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInputFile
                  id="file-multiple-input"
                  name="file-multiple-input"
                  multiple
                  custom
                  onChange={(e) => {
                    dispatch(
                      changeBoard({
                        form: "board",

                        사원번호: board.사원번호,
                        이름: board.이름,
                        요청사항: board.요청사항,
                        첨부파일: e.target.files,
                      })
                    );
                  }}
                />
                <CLabel htmlFor="file-multiple-input" variant="custom-file">
                  Choose Files...
                </CLabel>
              </CCol>
            </CFormGroup> */}
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
            onClick={() => {
              if (search.length === 0) {
                setSearchCheck(true);

                return;
              }

              if (board === undefined) {
                setBoardCheck(true);

                return;
              }
              BoardSend({ no, board });
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
