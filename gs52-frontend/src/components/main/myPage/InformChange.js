import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup,
  CCol,
  CLabel,
  CCardFooter,
  CButton,
  CSelect,
  CInputFile,
  CAlert,
} from "@coreui/react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import DaumPostCode from 'react-daum-postcode';
import {
  updateEmpImg,
} from "../../../lib/api/manager/Account/AccountRegistAPI";
import {
  UpdateInform,
} from "../../../lib/api/main/MyPage";
import { useSelector } from 'react-redux';
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { useHistory } from "react-router-dom";

export function InformChange() {
  const history = useHistory();
  const user = getCurrentUser();
  const [filecheck, setFilecheck] = useState(false);
  const [imgCheck, setImageCheck] = useState(false);
  const [filename, setFileName] = useState("");

  const { emp_list } =
    useSelector((state) => {
      return {
          emp_list: state.mypage.emp_list,
      };
    });
    
    //이름, 이메일, 연락처, 주소, 파일첨부
  const emp_data = emp_list.map((item) => ({
    name: item.emp_NAME,
    email:item.emp_EMAIL,
    address:item.emp_ADDRESS,
    phone:item.emp_PHONE,
    file:item.emp_IMG_PATH,
  }));  

  const [inputs, setInputs] = useState({
    name:null,
		tel:null,
		address:null,
    email:null,
    file: [],
	  })	
    const {name, tel, address, email, file} = inputs;
	
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


	const [addr, setAddr] = useState("");
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

  const imgUpload = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append("EMP_ID", Number(user.id));
    formData.append("FILES", file[0]);
    if(file[0]!=null){
      await updateEmpImg(formData);
    }
  };
  const onRegist = async () => {
    //이름, 이메일, 연락처, 주소, 파일첨부
    //  emp_data      name  email  address  phone  file
    //name, tel, address, email, file
    const ad = addr + address;
    await UpdateInform(user.index, name, email, tel, ad).then(
      (response) => {
        alert("수정되었습니다.")
        history.push("/InformChange");
      },
      (error) => {
        console.log(error);
      }
    );
    
  };

  return (
    <div>
      <CCard>
        <CCardHeader>회원정보 수정</CCardHeader>
        <CCardBody>
        <CFormGroup row>
            <CCol md="3">
            </CCol>
            <CCol xs="12" md="9">
            * 유의사항<br/><p></p>
              1. 입력한 정보에 대해서만 수정됩니다.<br/>
            </CCol>
          </CFormGroup>

        <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="name">이름</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="name"
                name="name"
                placeholder={emp_data[0].name}
                onChange={onChange}
                value={name || ""}
              />
            </CCol>
          </CFormGroup>

       
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="email">이메일</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="email"
                name="email"
                placeholder={emp_data[0].email}
                onChange={onChange}
                value={email || ""}
              />
            </CCol>
          </CFormGroup>


          <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="tel">연락처</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="tel" name="tel" placeholder={emp_data[0].tel}
                onChange={onChange} value={tel||''} type="number"/>
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
                  color="light"
                  style={{marginBottom:"10px"}}>우편번호찾기</CButton>
                  <>
                  {isDaumPost?(<DaumPostCode onComplete={handleComplete} style={modalStyle} autoClose={true} isDaumPost={isDaumPost} className="post-code" />):null}
                  </>
                   <CInput id="disabled-input" name="disabled-input" placeholder={addr} disabled style={{marginBottom:"10px"}} />
                <CInput id="address" name="address" placeholder="상세주소를 입력하세요"
              onChange={onChange} value={address||''}/>
              </CCol>
          </CFormGroup>


          <CFormGroup row>
            <CCol md="3">
              <CLabel>파일첨부</CLabel>
            </CCol>
            <CCol xs="12" md="5" style={{marginLeft:"15px"}}>
              <CInputFile
                id="file-multiple-input"
                name="file-multiple-input"
                custom
                onChange={(e) => {
                  console.log(e.target.files);
                  console.log(e.target.files[0].type.substring(0, 5));
                  if (e.target.files.size > 102400000) {
                    setFilecheck(true);
                    return;
                  }
                  if (e.target.files[0].type.substring(0, 5) !== "image") {
                    setImageCheck(true);
                    return;
                  }
                  setInputs((inputs) => ({
                    ...inputs,
                    file: e.target.files,
                  }));
                  setFileName(e.target.files[0].name);
                }}
              ></CInputFile>
              {filecheck && (
                <CAlert
                  color="danger"
                  closeButton
                  onClick={() => {
                    setFilecheck(false);
                  }}
                >
                  1024KB를 초과하였습니다.
                </CAlert>
              )}
              {imgCheck && (
                <CAlert
                  color="danger"
                  closeButton
                  onClick={() => {
                    setFilecheck(false);
                  }}
                >
                  이미지파일만 등록가능합니다.
                </CAlert>
              )}
              {file.length === 0 && (
                <CLabel htmlFor="file-multiple-input" variant="custom-file">
                  File Upload..
                </CLabel>
              )}
              {file.length !== 0 && (
                <CLabel htmlFor="file-multiple-input" variant="custom-file">
                  {filename}
                </CLabel>
              )}
            </CCol>
          </CFormGroup>

          
      
        </CCardBody>

        <CCardFooter>
        <CButton
            type="submit"
            size="sm"
            color="primary"
            onClick={async () => {
              await onRegist();
              await imgUpload();
            }}
          >
            Submit
          </CButton>
          <CButton type="reset" size="sm" color="danger">
            {" "}
            Reset
          </CButton>
        </CCardFooter>
      </CCard>
    </div>
  );
}

export default InformChange;
