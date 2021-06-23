import React,{useState} from "react";
import client from "../../client";

export const InformInsert = async (pwd, tel, address, bank, account) => {
  console.log("InformInsert API inserrrrrr");
  console.log("pwd "+pwd);
  
  const conf = await client.post("/manager/informLayout/regist",{emp_TEAM_INDEX:'1', emp_RANK_INDEX:'2', emp_POSITION_INDEX:'3', emp_ID:'12345678', emp_PWD:pwd})
                          .then(function (response){
                            //response
                          })
                          .catch(function(error){
                            //오류발생 시
                            console.log(error);
                          })
                          .then(function(){
                            //항상실행
                          });


};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
