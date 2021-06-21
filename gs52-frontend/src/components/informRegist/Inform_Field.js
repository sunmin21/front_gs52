import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup, CCol, CLabel, CCardFooter, CButton
} from '@coreui/react';



export function InformField() {
    const [pwd, setPwd] = useState();

    
    const onChange = (e) => {
      // e.target에는 이벤트가 발생한 input DOM에 대한 정보를 가지고 있다.
      console.log(e.target);
      // 이벤트가 발생한 DOM의 값 가져오기
      //console.log(e.target.value);
      setPwd(e.target.value);
  }

  const Submit_click = () =>{
    console.log(pwd);
  }
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
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" onChange={onChange} value={pwd}/>
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
                    <CButton type="submit" size="sm" color="primary" onClick={Submit_click}>Submit</CButton>
                    <CButton type="reset" size="sm" color="danger"> Reset</CButton>
                </CCardFooter>
            </CCard>
        </div>

    );

}

export default InformField;