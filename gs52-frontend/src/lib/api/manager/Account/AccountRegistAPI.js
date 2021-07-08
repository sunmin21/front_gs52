import client from "../../client";

import React,{useState} from "react";

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
const token = localStorage.getItem("accessToken")
const config={
  headers:{Authorization:`Bearer ${token}`}
};

client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("accessToken").replace(/\"/gi, "")}`;
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@token")
console.log(token)

const API_URL = "http://localhost:8081";
//부서
export const SelectDept = async () => {
  const dept = await client.post(API_URL +"/manager/select_dept");

  console.log("SelectDept API inserrrrrr");
  console.log(dept.data);
  return dept;

};

//직급
export const SelectRank = async () => {
  const rank = await client.post(API_URL +"/manager/select_rank");
  console.log("SelectRank API inserrrrrr");
  console.log(rank.data);
  return rank;

};

//직책
export const SelectPosition = async () => {
  const position = await client.post(API_URL +"/manager/select_position"
  );
  console.log("SelectPosition API inserrrrrr");
  console.log(position.data);
  return position;

};

export const RegistAccount = async (id, username, email, password, position, rank, team, first_login) => {
//String username, String email, String password, Long position, Long rank, Long team
  console.log("RegistAccount API inserrrrrr");

  console.log(id)
  console.log(username)
  console.log(email)
  console.log(password)
  console.log(position)
  console.log(rank)
  console.log(team)

  //const role = "ROLE_ADMIN";

  // console.log("role")
  // console.log(role)
  const regist = await client.post(API_URL + "/api/auth/signup",{
    id, username, email, password, position, rank, team, first_login
  }).then(()=>{
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  );
}

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
