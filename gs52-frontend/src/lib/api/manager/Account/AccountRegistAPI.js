import client from "../../client";

import React, { useState } from "react";

// const request = options => {
//   const token = localStorage.getItem("accessToken")
//   const headers = new Headers({
//     "Content-Type":"application/json"
//   });

//   if(localStorage.getItem("accessToken")){
//     headers.append(
//       "Authorization",
//       "Bearer "+localStorage.getItem("accessToken")
//     );
//   }

//   const defaults = {headers:headers};
//   options = Object.assign({}, defaults, options);

//   return fetch(options.url, options).then(response=>
//     response.json().then(json=>{
//       if(!response.ok){
//         return Promise.reject(json);
//       }
//       return json;
//     }))
// }
const token = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

if (localStorage.getItem("accessToken") != null) {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage
    .getItem("accessToken")
    .replace(/\"/gi, "")}`;
}
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@token");
console.log(token);

const API_URL = "http://localhost:8081";
//부서
export const SelectTeam = async () => {
  const team = await client.post(API_URL + "/manager/select_team");

  console.log("SelectTeam API inserrrrrr");
  console.log(team.data);
  return team;
};

//직급
export const SelectRank = async () => {
  const rank = await client.post(API_URL + "/manager/select_rank");
  console.log("SelectRank API inserrrrrr");
  console.log(rank.data);
  return rank;
};

//직책
export const SelectPosition = async () => {
  const position = await client.post(API_URL + "/manager/select_position");
  console.log("SelectPosition API inserrrrrr");
  console.log(position.data);
  return position;
};

export const RegistAccount = async (
  id,
  username,
  email,
  password,
  position,
  rank,
  team,
  first_login
) => {
  //String username, String email, String password, Long position, Long rank, Long team
  console.log("RegistAccount API inserrrrrr");

  console.log(id);
  console.log(username);
  console.log(email);
  console.log(password);
  console.log(position);
  console.log(rank);
  console.log(team);

  //const role = "ROLE_ADMIN";

  // console.log("role")
  // console.log(role)
  const regist = await client
    .post(API_URL + "/api/auth/signup", {
      id,
      username,
      email,
      password,
      position,
      rank,
      team,
      first_login,
    })
    .then(() => {
      alert("회원등록 되었습니다.");
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    })
    .catch(function (error) {
      console.log("error");
      if (error.response) {
        console.log(error.response.data.message);
        if (error.reponse.data.message == "Error: Email is already in use!") {
          console.log("이미등록된메일");
          alert("이미 등록된 이메일입니다.");
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

export const updateEmpImg = async (file) => {
  const project = await client.post(API_URL + "/api/auth/updateEmpImg", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return project;
};
export const mail = async (email, name, id) => {
  const title = "[GS52] " + name + "님의 계정정보입니다.";
  const message = "id : " + id + "   pwd:" + id;
  const regist = await client
    .post(API_URL + "/mail", { address: email, title: title, message: message })
    .then(() => {
      console.log("전송되었다아아아");
    });
};

// export const SelectEmp = async () => {
//   const position = await client.post(API_URL +"/manager/select_emp");
//   console.log("SelectPosition API inserrrrrr");
//   console.log(position.data);
//   return position;

// };

// export const InsertAccount = async (team, rank, position, id, date) => {
//   console.log("InsertAccounttttttttttttt");
//   console.log("team "+team);
//   console.log("rank "+rank);
//   console.log("position "+position);
//   console.log("id "+id);
//   console.log("date "+date);

//   const conf = await client.post(API_URL +"/manager/regist",{emp_TEAM_INDEX:team, emp_RANK_INDEX:rank, emp_POSITION_INDEX:position, emp_ID:id, emp_ENTRY_DATE:date})
//                           .then(function (response){
//                             //response
//                           })
//                           .catch(function(error){
//                             //오류발생 시
//                             console.log(error);
//                           })
//                           .then(function(){
//                             //항상실행
//                           });

// };
