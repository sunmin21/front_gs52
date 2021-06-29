import client from "../client";

const API_URL = "http://localhost:8081";
export const userList = async () => {
  console.log("이거타니?");
  const res = await client.get(API_URL + "/emp/listAll");

  return res.data;
};

export const login = async ({ id, pwd }) => {
  // console.log(parseInt(EMP_ID), EMP_PWD);
  return await client.post(API_URL + "/emp/login", {
    emp_ID: id,
    emp_PWD: pwd,
  });
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
