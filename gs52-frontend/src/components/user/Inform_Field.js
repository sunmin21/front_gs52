import React,{useState} from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup, CCol, CLabel, CCardFooter, CButton, CSelect,
} from '@coreui/react';
import { useHistory   } from "react-router-dom";

import { update } from "../../lib/api/jwt/LoginAPI";
import {getCurrentUser} from "../../lib/api/jwt/LoginAPI";
import DaumPostCode from 'react-daum-postcode';

export function InformField() {
	const history = useHistory();
	const [inputs, setInputs] = useState({
		first_pwd:null,
		second_pwd:null,
		tel:null,
		address:null,
		birth:null,
		photo:null,
		bank_name:null,
		account_number:null
	  })
	
	const [pwd_message, setPwd_message] = useState(null);
	const [pwd_check, setPwd_check] = useState(false);
	const [addr, setAddr] = useState("");

	const {first_pwd, second_pwd, tel, address, birth, photo, bank_name, account_number} = inputs;
	// const onChange(e: React.ChangeEvent<HTMLInputElement>) {
	// 	const { value } = e.target
	// 	// value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
	// 	const onlyNumber = value.replace(/[^0-9]/g, '')
	// 	setInputs(onlyNumber)
	//   }
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
		if(pwd_check===false){
			alert("비밀번호를 확인하세요.")
		}
		else{
			const user = getCurrentUser();
			{update(user.id, first_pwd, addr, tel, birth, photo, bank_name, account_number).then(
				() => {
					console.log("성공")
					  history.push('/');
				},
				error => {
					console.log("error")
					console.log(error)
				}
			  );}
		}
	}

	const [isDaumPost,setIsDaumPost]=useState(false);
	const onModal = () =>{
        setIsDaumPost(true);
    }

	const modalStyle = {
		position: 'absolute',
		zIndex: '100',
		border: '1px solid #000000',
		overflow: 'hidden',
	  };

	const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        //fullAddress -> 전체 주소반환
        setAddr(fullAddress);
    }

    return (
        <div>
            <CCard>
                <CCardHeader>
                    회원정보입력
                </CCardHeader>
                <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="first_pwd">비밀번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="first_pwd" name="first_pwd" placeholder="Password" autoComplete="first_pwd" 
					onChange={onChange} value={first_pwd||''}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="second_pwd">비밀번호 확인</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="second_pwd" name="second_pwd" placeholder="Password" autoComplete="second_pwd"
					onChange={onChange} value={second_pwd||''}/>
                  </CCol>
                </CFormGroup>                
				
				<CFormGroup row>
                  <CCol md="3">
                  </CCol>
                  <CCol xs="12" md="9" >
						{pwd_message}
                  </CCol>
                </CFormGroup>  
				

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="tel">연락처</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="tel" name="tel" placeholder="'-'을 제외한 숫자만 입력하시오" 
					onChange={onChange} value={tel||''}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="address">주소</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
						{/* <DaumPost setAddr={setAddr}></DaumPost> */}
						<CButton 
							onClick={onModal} 
							className="mr-1"
							>우편번호찾기</CButton>
							{console.log(isDaumPost)}
							{isDaumPost?(<DaumPostCode onComplete={handleComplete} style={modalStyle} autoClose={true} isDaumPost={isDaumPost} className="post-code" />):null}
						<p>{addr}</p>
						<CInput id="address" name="address" placeholder="상세주소를 입력하세요"
					onChange={onChange} value={address||''}/>
                  </CCol>
                </CFormGroup>

				
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="account_number">급여계좌</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
				  	<CSelect id="bank_name" name="bank_name" onChange={onChange}>
				
					</CSelect>
                    <CInput id="account_number" name="account_number" placeholder="계좌" autoComplete="account_number" 
					onChange={onChange} value={account_number||''}/>
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

export default InformField;