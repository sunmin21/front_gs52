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

  //auth로 JPA로 등록
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

export const UpdateInform = async(index, name, email, tel, address)=>{
  console.log("UpdateInform")
  console.log(index)
  console.log(name)
  console.log(email)
  console.log(tel)
  console.log(address)
  const update =await client.post(API_URL + "/updateInform",{
                                        emp_INDEX:index,
                                        emp_NAME:name,
                                        emp_EMAIL:email,
                                        emp_PHONE:tel,
                                        emp_ADDRESS:address
                                        })

}
