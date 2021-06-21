import client from "../client";

import React,{useState} from "react";

export const SelectConf = async () => {
  console.log("이거오냐");


  const conf = await client.get("/schedule/confRoom/select");
  console.log(conf.data);
};

export const InsertConf = async (floor, room) => {
  console.log("Conf API inserrrrrr");
  console.log("floor"+floor);
  console.log("room"+room);
  
  const conf = await client.post("/schedule/confRoom/insert",{room_BOOK_TITLE:floor, room_BOOK_INDEX:room})
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
