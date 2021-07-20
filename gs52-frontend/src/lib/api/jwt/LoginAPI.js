import client from "../client";

import React, { useState } from "react";

import { user_state } from "src/modules/main/main";

const API_URL = "http://192.168.20.17:8081";

// export const LoginAPI = async (username, password) => {
// //String username, String email, String password, Long position, Long rank, Long team
//   console.log("LoginAPI API inserrrrrr");
//   console.log(username)
//   console.log(password)

//   const login = await client.post(API_URL + "/api/auth/signin",{
//     username,
//     password
//   });

//   //  console.log("login")
//   //  console.log(login.data)
//    return login.data.first_login;
// }

export const LoginAPI = async (username, password) => {
  const login = await client
    .post(API_URL + "/api/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken).replace(/\"/gi, "")
        );
      }

      const { accessToken } = response.data;

      //api요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      //이렇게 하면 accessToken을 localStorage, cookie에 저장하지 않는다.
      client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      //return response.data;
    })
    .catch();

  return login;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("authenticatedUser");
  localStorage.removeItem("w_state");
  localStorage.removeItem("breakIndex");
};

export const register = async ({
  username,
  email,
  password,
  position,
  rank,
  team,
}) => {
  return await client
    .post(API_URL + "signup", {
      username,
      email,
      password,
      position,
      rank,
      team,
    })
    .then()
    .error();
};

export const update = async (
  id,
  password,
  address,
  phone,
  birth,
  photo,
  bank_name,
  account_number
) => {
  //String password, String address, String phone, String birth, String photo, String bank_name, long account_number
  return await client.post(API_URL + "/api/auth/update_user", {
    id,
    password,
    address,
    phone,
    birth,
    photo,
    bank_name,
    account_number,
  });
};

//token 생성
export const createJWTToken = (token) => {
  return "Bearer " + token;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

/*
  //로그인에 성공하면 username을 authenticatedUser로 localstorage에 저장
  //JWT token을 생성해 setupAxiosInterceptors에 넣기
  registerSuccessfulLoginForJwt(username, token){
    console.log("registerSuccessfulLoginForJwt")
    localStorage.setItem('token', token)
    localStorage.setItem('authenticatedUser', username)
    this.setupAxiosInterceptors();
  }
 */
