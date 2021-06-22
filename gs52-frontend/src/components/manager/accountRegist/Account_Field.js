import React,{useState} from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup, CCol, CLabel, CCardFooter, CButton
} from '@coreui/react';

import { SelectDept } from "../../../lib/api/manager/AccountRegist/AccountRegistAPI";
import { all } from 'redux-saga/effects';

export function AccountField() {
	const [inputs, setInputs] = useState({
		dept:null,
		emp_rank:null,
		emp_position:null,
		emp_num:null,
		emp_date:null,
	  })
	

	  
	const {dept, emp_rank, emp_position, emp_num, emp_date} = inputs;
	
	const onChange = (e) => {
		//input에 name을 가진 요소의 value에 이벤트를 걸었다
		const { name, value } = e.target   
	
		// 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
		const nextInputs = {            
		//스프레드 문법으로 기존의 객체를 복사한다.
				...inputs,  
				[name]: value,
			}
		//만든 변수를 seInput으로 변경해준다.
			setInputs(nextInputs)       

		
	}

	const onRegist=()=>{
			//{InformInsert(first_pwd, second_pwd, tel, address, bank, account)}
		

	}

    const onClick=()=>{
        SelectDept();
    }
    return (
        <div>
            <button onClick={onClick}>sdfsdf</button>
            <CCard>
                <CCardHeader>
                    계정 등록
                </CCardHeader>
                <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="dept">부서</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                   Select 문
                  </CCol>
                </CFormGroup>
               
               <CFormGroup row>
                 <CCol md="3">
                   <CLabel htmlFor="emp_rank">직급</CLabel>
                 </CCol>
                 <CCol xs="12" md="9">
                   <CInput id="emp_rank" name="emp_rank" placeholder="사원 번호" 
                   onChange={onChange} value={emp_rank||''}/>
                 </CCol>
               </CFormGroup>
               
               <CFormGroup row>
                 <CCol md="3">
                   <CLabel htmlFor="emp_position">직책</CLabel>
                 </CCol>
                 <CCol xs="12" md="9">
                   <CInput id="emp_position" name="emp_position" placeholder="사원 번호" 
                   onChange={onChange} value={emp_position||''}/>
                 </CCol>
               </CFormGroup>
				
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="emp_num">사원번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="emp_num" name="emp_num" placeholder="사원 번호" 
					onChange={onChange} value={emp_num||''}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="emp_date">입사일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                        date picker
                  </CCol>
                </CFormGroup>
                </CCardBody>

                <CCardFooter>              
                    <CButton type="submit" size="sm" color="primary" onClick={onRegist}>Submit</CButton>
                    <CButton type="reset" size="sm" color="danger"> Reset</CButton>
                </CCardFooter>
            </CCard>
        </div>

    );

}

export default AccountField;