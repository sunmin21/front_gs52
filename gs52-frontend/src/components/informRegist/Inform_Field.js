import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup, CCol, CLabel, CCardFooter, CButton
} from '@coreui/react';

export function InformField() {
    return (
        <div>
            <CCard>
                <CCardHeader>
                    회원정보입력rsdfsdfsdfsdfsdf
                </CCardHeader>
                <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">비밀번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">비밀번호 확인</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                  </CCol>
                </CFormGroup>                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">연락처</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">주소</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">급여계좌</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                  </CCol>
                </CFormGroup>

                </CCardBody>

                <CCardFooter>              
                    <CButton type="submit" size="sm" color="primary">Submit</CButton>
                    <CButton type="reset" size="sm" color="danger"> Reset</CButton>
                </CCardFooter>
            </CCard>
        </div>

    );

}

export default InformField;