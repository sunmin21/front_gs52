import client from "../client";

import React, { useState } from "react";

const API_URL = "http://localhost:8081/main/MyPage";

export const SelectEmp = async (index) => {
    console.log("SelectWorkRule");
    console.log(index);
    const emp = await client.post(API_URL + "/selectEmp", { emp_INDEX: index });
    console.log("emp");
    console.log(emp);
    return emp;
  };

export const CheckPwd = async(username, password, newPassword)=>{
  console.log("CheckPwd");
  console.log(username)
  console.log(password)
  console.log(newPassword)
  const check = await client.post("http://localhost:8081/api/auth/update_Pwd",{
    username,
    password,
    newPassword});
    console.log("check")
    console.log(check.data)
  return check;
}

