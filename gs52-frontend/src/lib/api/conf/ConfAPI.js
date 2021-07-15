import client from "../client";

import React, { useState } from "react";

const API_URL = "http://localhost:8081";
//export const InsertConf = async (floor, room, index, title, date, startTime, endTime) => {
export const InsertConf = async (
  held_empIndex,
  roomIndex,
  title,
  date,
  startTime,
  endTime,
  empList
) => {
  // console.log("Conf API inserrrrrr");
  const conf = await client
    .post(API_URL + "/schedule/confRoom/insert", {
      conf_TITLE: title,
      conf_ROOM_INDEX: roomIndex,
      conf_DATE: date,
      conf_START: startTime,
      conf_END: endTime,
      conf_EMP_INDEX_SEND: held_empIndex,
      person:empList
    })
    .then(function (response) {
      //response
    })
    .catch(function (error) {
      //오류발생 시
      console.log(error);
    })
    .then(function () {
      //항상실행
    });

    // const confRe = await client.post(API_URL+"/schedule/confRoom/empInsert",{
    //     conf_RE_EMP_INDEX:,
    //     conf_RE_CONF_INDEX:empList,
    // })
};

export const SelectConf = async () => {
  console.log("SelectConf");
  const conf = await client.post(API_URL + "/schedule/confRoom/select_confList");
  //return conf.data;
  return conf;
};

export const SelectRoomFloor = async () => {
  console.log("Select_floor");
  const conf = await client.post(
    API_URL + "/schedule/confRoom/select_room_floor"
  );

  console.log(conf);
  return conf;
};

export const SelectConfRoom = async (floor) => {
  console.log("Select_room");
  console.log(floor);
  const conf = await client.post(
    API_URL + "/schedule/confRoom/Select_conf_room",
    { conf_ROOM_FLOOR: floor }
  );

  console.log("conffffffffffffff");
  console.log(conf);
  return conf;
};

export const Select_emp = async () => {
  const conf = await client.post(API_URL + "/schedule/confRoom/select_emp");
  console.log(conf.data);
};


export const Select_ConfOne = async (index) => {
  console.log("@@@@@@@@@@@@@@@Select_ConfOne");
  console.log(index);
  const conf = await client.post(API_URL + "/schedule/confRoom/select_confOne",{conf_INDEX:index});
  console.log(conf);
  return conf;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
