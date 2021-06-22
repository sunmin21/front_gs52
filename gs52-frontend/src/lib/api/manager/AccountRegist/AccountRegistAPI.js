import client from "../../client";

import React,{useState} from "react";

export const SelectDept = async () => {
  console.log("SelectDept API inserrrrrr");
  const conf = await client.get("/manager/select_dept");
  console.log(conf);
  return conf.data;

};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
