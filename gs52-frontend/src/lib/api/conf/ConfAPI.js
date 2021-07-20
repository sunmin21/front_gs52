import client from "../client";

import React, { useState } from "react";

const API_URL = "http://192.168.20.17:8081";
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
  const conf = await client
    .post(API_URL + "/schedule/confRoom/insert", {
      conf_TITLE: title,
      conf_ROOM_INDEX: roomIndex,
      conf_DATE: date,
      conf_START: startTime,
      conf_END: endTime,
      conf_EMP_INDEX_SEND: held_empIndex,
      person: empList,
    })
    .then(function (response) {
      //response
    })
    .catch(function (error) {
      //오류발생 시
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
  const conf = await client.post(
    API_URL + "/schedule/confRoom/select_confList"
  );
  //return conf.data;
  return conf;
};

export const SelectRoomFloor = async () => {
  const conf = await client.post(
    API_URL + "/schedule/confRoom/select_room_floor"
  );

  return conf;
};

export const SelectConfRoom = async (floor) => {
  const conf = await client.post(
    API_URL + "/schedule/confRoom/Select_conf_room",
    { conf_ROOM_FLOOR: floor }
  );

  return conf;
};

export const Select_emp = async () => {
  const conf = await client.post(API_URL + "/schedule/confRoom/select_emp");
};

export const Select_ConfOne = async (index) => {
  const conf = await client.post(
    API_URL + "/schedule/confRoom/select_confOne",
    { conf_INDEX: index }
  );

  return conf;
};

export const Delete_Conf = async (index,emp_index) => {
  console.log(index)
  console.log(emp_index)
  const delete_conf = await client.post(
    API_URL + "/schedule/confRoom/delete_conf",
    { conf_INDEX: index,
      conf_EMP_INDEX_SEND:emp_index }
  );
  return delete_conf;
};


export const Delete_confRe = async (index) => {
  console.log(index)
  const delete_conf = await client.post(
    API_URL + "/schedule/confRoom/delete_confRe",
    { conf_INDEX: index }
  );
};

export const overlap_Conf = async (room_index, date, start, end) => {
  const overlap_Conf = await client.post(
    API_URL + "/schedule/confRoom/select_confOverlap",
    { conf_ROOM_INDEX: room_index,
      conf_DATE:date,
      conf_START:start,
      conf_END: end}
  );
  return overlap_Conf;
};


// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
