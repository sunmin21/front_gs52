import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CInput,
    CFormGroup, CCol, CLabel, CCardFooter, CButton, CSelect,
  } from '@coreui/react';
  import DaumPostCode from 'react-daum-postcode';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import {SelectEmp}from "src/lib/api/main/MyPage"

export function MyPage() {  
    const history = useHistory();
    const dispatch = useDispatch();
    const { emp_list } =
      useSelector((state) => {
        return {
            emp_list: state.mypage.emp_list,
        };
      });

    const user = getCurrentUser();
    const [check_email, setCheck_email]=useState(false);
    const emp_data = emp_list.map((item) => ({
        name: item.emp_NAME,
        id:item.emp_ID,
        date:item.emp_ENTRY_DATE,
        email:item.emp_EMAIL,
        address:item.emp_ADDRESS,
        phone:item.emp_PHONE,
        birth:item.emp_BIRTH,
        team:item.team_NAME,
        rank:item.rank_NAME,
        position:item.position_NAME,
        dept:item.dept_NAME
      }));  

    const [inputs, setInputs] = useState({
        name:null,
	    phone:null,
		address:null,
		birth:null,
		photo:null,
		bank_name:null,
		account_number:null,
        email:null
	  })
	const {name, phone, email, address, birth, photo, bank_name, account_number} = inputs;

    // useEffect(async()=>{
    //     await dispatch(EmpAxios(user.index));
    // },[dispatch])


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

    const onClick=(name)=>{
        if(name=="email"){
            //setCheck_email(true);
        }
    }

    const InformChangeButton=()=>{

        history.push("/InformChange");
    }
    const PwdChangeButton=()=>{

        history.push("/PwdChange");
    }

  	return (
		<div>
		    <CCard>
                <CCardHeader>
                  마이페이지
                </CCardHeader>

                <CCardBody>

                {/* <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="first_pwd">비밀번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="first_pwd" name="first_pwd" placeholder="특수문자, 문자, 숫자 포함 8~15자리" autoComplete="first_pwd" 
					onChange={onChange} value={first_pwd||''}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="second_pwd">비밀번호 확인</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="second_pwd" name="second_pwd" placeholder="특수문자, 문자, 숫자 포함 8~15자리" autoComplete="second_pwd"
					onChange={onChange} value={second_pwd||''}/>
                  </CCol>
                </CFormGroup>                */}
				
				{/* <CFormGroup row>
                  <CCol md="3">
                  </CCol>
                  <CCol xs="12" md="9" >
						{pwd_message}
						{pwd_reg}
                  </CCol>
                </CFormGroup>   */}
				

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">이름</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <p className="form-control-static">{emp_data[0].name}</p>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">사원번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <p className="form-control-static">{emp_data[0].id}</p>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="address">부서/팀/직책/직급</CLabel>
                  </CCol>
                  <CCol>
                  <p className="form-control-static">{emp_data[0].dept} / {emp_data[0].team} / {emp_data[0].position} / {emp_data[0].rank}</p>
                  </CCol>
                </CFormGroup>

                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">입사일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <p className="form-control-static">{emp_data[0].date}</p>
                  </CCol>
                </CFormGroup>

                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">생년월일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <p className="form-control-static">{emp_data[0].birth}</p>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email">이메일</CLabel>
                  </CCol>
                  <CCol>
                  <p className="form-control-static">{emp_data[0].email}</p>
                  </CCol>
                  
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="phone">연락처</CLabel>
                  </CCol>
                  <CCol >
                  <p className="form-control-static">{emp_data[0].phone}</p>
                  </CCol>                  
                </CFormGroup>
                

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="address">주소</CLabel>
                  </CCol>
                  <CCol>
                  <p className="form-control-static">{emp_data[0].address}</p>
                  </CCol>
                </CFormGroup>

                </CCardBody>



                <CCardFooter>              
                    <CButton type="submit" size="sm" color="primary" onClick={InformChangeButton} style={{ textAlign: "center", margin:"auto"}}>회원정보 수정</CButton>
                    <CButton type="submit" size="sm" color="primary" onClick={PwdChangeButton} style={{ textAlign: "center", margin:"auto"}}>비밀번호 수정</CButton>
                </CCardFooter>
            </CCard>
		</div>
  	);
}

export default MyPage;
