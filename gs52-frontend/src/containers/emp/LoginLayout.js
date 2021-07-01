import React,{useState, useEffect} from "react";
import Login from "../../components/emp/Login";
import moment from 'moment';
import {
	CCard,
	CCardBody,
	CCardHeader,
  } from '@coreui/react';



const LoginLayout = () => {
    return (
        <div>
        <CCard>
            
            <CCardHeader>
                <big>로그인</big>  
            </CCardHeader>
                
            <CCardBody>
                <Login></Login>
            </CCardBody>
        </CCard>
            
        </div>
    );
}


export default LoginLayout;
