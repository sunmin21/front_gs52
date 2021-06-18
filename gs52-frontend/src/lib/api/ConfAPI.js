import client from "./client";

import React,{useState} from "react";

export const SelectConf = async () => {
  console.log("이거오냐");


  const conf = await client.get("/schedule/confRoom/select");
  console.log(conf.data);
};

export const InsertConf = async (data) => {
  console.log("inserrrrrr");
  console.log("data floor"+data.floor);
  console.log("data room"+data.room);

  const floor = data.floor;
  const room = data.room;
  console.log("data floor"+floor);
  console.log("data room"+room);
  
  const conf = await client.post("/schedule/confRoom/insert",{room_BOOK_TITLE:data, room_BOOK_INDEX:3})
                          // .then(function (response){
                          //   //response
                          // })
                          // .catch(function(error){
                          //   //오류발생 시
                          //   console.log(error);
                          // })
                          // .then(function(){
                          //   //항상실행
                          // });


};


// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
