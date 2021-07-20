import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CInput,
    CFormGroup, CCol, CLabel, CCardFooter, CButton, CSelect, CRow,
  } from '@coreui/react';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

export function MyPage() {  
    const history = useHistory();
    const dispatch = useDispatch();
    const { emp_list } =
      useSelector((state) => {
        return {
            emp_list: state.mypage.emp_list,
        };
      });
    
      console.log(emp_list)

    const user = getCurrentUser();
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
        dept:item.dept_NAME,
        img:item.emp_IMG_PATH
      }));  


    const InformChangeButton=()=>{

        history.push("/InformChange");
    }
    const PwdChangeButton=()=>{

        history.push("/PwdChange");
    }

  	return (
		<div>
		    <CCard>
                <CCardBody>
                <CFormGroup row>
                  <CCol xs="12" md="3" style={{backgroundColor:"black"}}>
                  <img
                    src={emp_data[0].img}
                    style={{
                      width: "200px",
                      height: "225px",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  />
                  </CCol>

                  </CFormGroup>

                
                  <CFormGroup row>
                  <CCol md="3" style={{backgroundColor:"yellow"}}>
                    <CLabel htmlFor="name">이름</CLabel>
                  </CCol>
                  <CCol xs="12" md="6" style={{backgroundColor:"red"}}>
                  <p className="form-control-static">{emp_data[0].name}</p>
                  </CCol>
                  
                </CFormGroup>

                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">사원번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="3">
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


            </CCard>
		</div>
  	);
}

export default MyPage;
