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
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

const CreateTodo = ({ success, remove }) => {
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

  return (
    <>
      <CCard>
        <CCardHeader>요청사항</CCardHeader>
        <CCardBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">요청직원</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInputGroup style={{ float: "right" }}>
                <div style={{ float: "right", textAlign: "center" }}>
                  <CInput
                    id="input1-group2"
                    name="input1-group2"
                    //   placeholder="Username"
                    style={{ width: "80%" }}
                    value={board}
                  />
                </div>
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
              />
            </CCol>
          </CFormGroup>
        </CCardBody>
        <CButton
          active
          block
          color="success"
          onClick={(e) => {
            success(e);
            remove(e);
          }}
          aria-pressed="true"
          value={board}
          name={2}
        >
          완료
        </CButton>
        <CButton
          active
          block
          color="danger"
          onClick={(e) => {}}
          aria-pressed="true"
          value={board}
          name={1}
        >
          거절
        </CButton>
      </CCard>
    </>
  );
};

export default CreateTodo;
