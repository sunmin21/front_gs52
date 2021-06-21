import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CInputGroup,
  CInputGroupPrepend,
  CLabel,
  CTextarea,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";

import Modal from "src/containers/common/UserModal";
import { changeBoard } from "src/modules/task";
import modalcontent from "./Search";
const CreateTodo = () => {
  const { search } = useSelector(({ emp }) => ({
    search: emp.search,
  }));
  const { board } = useSelector(({ task }) => ({
    board: task.board,
  }));
  console.log(board);
  const dispatch = useDispatch();
  return (
    <>
      <CCard>
        <CCardHeader>
          Basic Form
          <small> Elements</small>
        </CCardHeader>
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
                      value={board["이름"]}
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
                  value={board.요청사항}
                  onChange={(e) => {
                    dispatch(
                      changeBoard({
                        form: "board",

                        사원번호: board.사원번호,
                        이름: board.이름,
                        요청사항: e.target.value,
                        첨부파일: board.첨부파일,
                      })
                    );
                  }}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
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
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" size="sm" color="primary">
            <CIcon name="cil-scrubber" /> Submit
          </CButton>
          <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban" /> Reset
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default CreateTodo;
