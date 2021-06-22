import client from "../client";

import React,{useState} from "react";

export const SelectConf = async () => {
  console.log("이거오냐");


  const conf = await client.get("/schedule/confRoom/select");
  return conf.data;
};

export const InsertConf = async (floor, room, title) => {
  console.log("Conf API inserrrrrr");
  console.log("floor "+floor);
  console.log("room "+room);
  console.log("title "+title);
  
  const conf = await client.post("/schedule/confRoom/insert",{room_B_TITLE:title, room_B_INDEX:floor})
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






export const Select_emp = async () => {
  console.log("이거오냐");
  const conf = await client.get("/schedule/confRoom/select_emp");
  console.log(conf.data);
};


// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
