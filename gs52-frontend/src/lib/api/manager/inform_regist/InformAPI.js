import client from "../../client";

import React,{useState} from "react";

export const InformInsert = async (pwd, tel, address, bank, account) => {
  console.log("Inform API inserrrrrr");
  console.log("pwd "+pwd);
  console.log("tel "+tel);
  console.log("address "+address);
  
  // const conf = await client.post("/schedule/confRoom/insert",{room_B_TITLE:title, room_B_INDEX:floor})
  //                         .then(function (response){
  //                           //response
  //                         })
  //                         .catch(function(error){
  //                           //오류발생 시
  //                           console.log(error);
  //                         })
  //                         .then(function(){
  //                           //항상실행
  //                         });


};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
