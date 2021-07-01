import client from "../client";
//얘 안탐ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ

const API_URL = "http://localhost:8081";
export const userList = async () => {
  console.log("auth.js")
  const res = await client.get("/emp/listAll");
  return res.data;
};

export const login = async ({ id, pwd }) => {
  // console.log(parseInt(EMP_ID), EMP_PWD);
  console.log("auth.js")
  return await client.post(API_URL + "/api/auth/signin", {
    id: id,
    password: pwd,
  });
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
