import React, { useState } from "react";
import { useHistory, Redirect   } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import {LoginAPI
} from "../../lib/api/jwt/LoginAPI";
//import AuthService from "../../jwt/services/auth.service";
import {getCurrentUser} from "../../lib/api/jwt/LoginAPI";

export function Login() {


  const history = useHistory();
    const [user, setUser] = useState({
        id: "",
        pwd: "",
    });
    const { id, pwd} = user;

    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
          ...user,
          [name]: value,
        };
        setUser(nextInputs);
      };

  
    const required = value => {
        if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
            This field is required!
            </div>
        );
        }
    };

    const onLogin = () => {
        console.log("onLogin")
        console.log(user.id)        
        console.log(user.pwd)

        const res = LoginAPI(user.id, user.pwd).then(
            () => {
                console.log("로그인 성공")
                const user_state = getCurrentUser();
                if(user_state.first_login === 1){
                  history.push('/first_login');
                }
                else{
                  history.push('/');
                }

            },
            error => {
                console.log("error")
                console.log(error)
                alert("로그인에 실패하였습니다.")
            }
          );

          
           console.log("로그인결과")  
           console.log(res)
           
    }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">

                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="사원번호"
                        autoComplete="username"
                        name="id"
                        onChange={onChange}
                      />
                    </CInputGroup>


                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="current-password"
                        name="pwd"
                        onChange={onChange}
                      />
                    </CInputGroup>


                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={onLogin}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>


                </CCardBody>
              </CCard>
             
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;