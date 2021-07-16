import client from "../client";

import React, { useState } from "react";

const API_URL = "http://192.168.20.17:8081/main/MyPage";

export const SelectEmp = async (index) => {
  console.log("SelectWorkRule");
  console.log(index);
  const emp = await client.post(API_URL + "/selectEmp", { emp_INDEX: index });
  console.log("emp");
  console.log(emp);
  return emp;
};

//auth로 JPA로 등록
export const CheckPwd = async (username, password, newPassword) => {
  console.log("CheckPwd");
  console.log(username);
  console.log(password);
  console.log(newPassword);
  const check = await client.post(
    "http://192.168.20.17:8081/api/auth/update_Pwd",
    {
      username,
      password,
      newPassword,
    }
  );
  console.log("check");
  console.log(check.data);
  return check;
};

export const UpdateInform = async (index, name, email, tel, address) => {
  console.log("UpdateInform");
  const update = await client
    .post(API_URL + "/updateInform", {
      emp_INDEX: index,
      emp_NAME: name,
      emp_EMAIL: email,
      emp_PHONE: tel,
      emp_ADDRESS: address,
    })
    .then(() => {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      client
        .post("http://192.168.20.17:8081/api/auth/update_userInfo", {})
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem(
              "accessToken",
              JSON.stringify(response.data.accessToken).replace(/\"/gi, "")
            );
          }

          const { accessToken } = response.data;
          console.log(accessToken);
          //api요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          //이렇게 하면 accessToken을 localStorage, cookie에 저장하지 않는다.
          client.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          console.log("response");
          console.log(response);
          //return response.data;
        });
    });
};
