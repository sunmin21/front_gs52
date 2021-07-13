import React, {useEffect, useState} from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CInput,
    CFormGroup, CCol, CLabel, CCardFooter, CButton, CSelect,
  } from '@coreui/react';
  import DaumPostCode from 'react-daum-postcode';
  import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import {CheckPwd}from "src/lib/api/main/MyPage"

export function ConfRoom(props) {  
    const history = useHistory();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
		first_pwd:null,
		second_pwd:null,
		pwd:null,
	  })
	
	const [pwd_message, setPwd_message] = useState(null);
	const [pwd_check, setPwd_check] = useState(false);
	const [pwd_regcheck, setPwd_regcheck] = useState(false);
	const [pwd_reg, setPwd_reg] = useState(null);
	const [addr, setAddr] = useState("");

	const {first_pwd, second_pwd, pwd} = inputs;
	// const onChange(e: React.ChangeEvent<HTMLInputElement>) {
	// 	const { value } = e.target
	// 	// value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
	// 	const onlyNumber = value.replace(/[^0-9]/g, '')
	// 	setInputs(onlyNumber)
	//   }
		var regex_PW = /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
		//특수문자, 문자, 숫자 포함 형태의 6~15자리 이내의 암호 정규식

		
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

			
			// 비밀번호 썼다가 지웠을 때, 같다고 나오는 경우 해결
			if(e.target.id === 'first_pwd'){
				if(!regex_PW.test(e.target.value)){
					console.log(e.target.value)
					setPwd_regcheck(false);
					setPwd_reg('비밀번호 형식이 맞지 않습니다.');
				}
				else{
					setPwd_regcheck(true);
					setPwd_reg('');
				}

				if(inputs.second_pwd === null){
					setPwd_message('')
					setPwd_check(false);
				}
				else if(e.target.value !== inputs.second_pwd){
					setPwd_message('비밀번호가 일치하지 않습니다.')
					setPwd_check(false);
				}			
				else if(e.target.value === inputs.second_pwd){
					setPwd_message('비밀번호가 일치합니다.')
					setPwd_check(true);
				}
				else if(e.target.value===''){
					setPwd_message('비밀번호를 입력하세요.')
					setPwd_check(false);
				}
			}
			else if(e.target.id === 'second_pwd'){
				if(inputs.first_pwd === null){
					setPwd_message('')
					setPwd_check(false);
				}
				else if(e.target.value !== inputs.first_pwd){
					setPwd_message('비밀번호가 일치하지 않습니다.')
					setPwd_check(false);
				}			
				else if(e.target.value === inputs.first_pwd){
					setPwd_message('비밀번호가 일치합니다.')
					setPwd_check(true);
				}
				else if(e.target.value===''){
					setPwd_message('비밀번호를 입력하세요.')
					setPwd_check(false);
				}
			}
	}

	const onRegist=()=>{

		if(pwd_check===false ||pwd==null || inputs.first_pwd==null || inputs.second_pwd==null){
			alert("비밀번호를 확인하세요.")
		}
        else if(pwd_regcheck===false){
            alert("비밀번호 형식을 확인하세요.")
        }
		else{
			const user = getCurrentUser();
			const result = CheckPwd(user.id, pwd,first_pwd).then(
				() => {
					console.log("성공")
                    alert("비밀번호가 변경되었습니다.");
					  history.push('/myPage');
				},
				error => {
					alert("기존 비밀번호가 일치하지 않습니다.");
					console.log("error")
					console.log(error)
				}
			  );
            if(result){

            }
		}
	}



  	return (
		<div>
		    <CCard>
                <CCardHeader>
                  비밀번호 변경
                </CCardHeader>

                <CCardBody>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="pwd">기존 비밀번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="pwd" name="pwd" placeholder="특수문자, 문자, 숫자 포함 6~15자리" autoComplete="pwd" 
					onChange={onChange} value={pwd||''}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="first_pwd">새 비밀번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="first_pwd" name="first_pwd" placeholder="특수문자, 문자, 숫자 포함 6~15자리" autoComplete="first_pwd"
					onChange={onChange} value={first_pwd||''}/>
                  </CCol>
                </CFormGroup>          
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="second_pwd">새 비밀번호 확인</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="second_pwd" name="second_pwd" placeholder="특수문자, 문자, 숫자 포함 6~15자리" autoComplete="second_pwd"
					onChange={onChange} value={second_pwd||''}/>
                  </CCol>
                </CFormGroup>           
				
                <CFormGroup row>
                  <CCol md="3">
                  </CCol>
                  <CCol xs="12" md="9" >
						{pwd_reg}<br/>
						{pwd_message}
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

export default ConfRoom;