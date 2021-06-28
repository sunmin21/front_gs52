import client from "../client";

import React,{useState} from "react";

//export const InsertConf = async (floor, room, index, title, date, startTime, endTime) => {
  export const InsertConf = async (roomIndex, title, date, startTime, endTime) => {
  // console.log("Conf API inserrrrrr");
  console.log("roomIndex "+roomIndex);
  console.log("title "+title);
  console.log("date "+date);
  console.log("startTime "+startTime);
  console.log("endTime "+endTime);
  
  const conf = await client.post("/schedule/confRoom/insert", {conf_TITLE:title, conf_ROOM_INDEX:roomIndex, conf_DATE:date, conf_START:startTime,
                                                                conf_END:endTime, conf_EMP_INDEX_SEND:1})
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

export const SelectConf = async () => {
  // console.log("SelectConf")
  const conf = await client.get("/schedule/confRoom/select");
  //return conf.data;
  return conf;
};


export const SelectRoomFloor = async () => {
  console.log("Select_floor");
  const conf = await client.get("/schedule/confRoom/select_room_floor");
  
  console.log(conf);
  return conf;
};



export const SelectRoom = async (floor) => {
  console.log("Select_room");
  console.log(floor);
  const conf = await client.post("/schedule/confRoom/Select_conf_room", {conf_ROOM_FLOOR:floor});
  
  console.log("conffffffffffffff");
  console.log(conf);
  return conf;
};

export const Select_emp = async () => {
  console.log("이거오냐");
  const conf = await client.get("/schedule/confRoom/select_emp");
  console.log(conf.data);
};


// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
