import client from "../client";
export const userList = async () => {
  const res = await client.get("/emp/listAll");

  return res.data;
};

export const login = async ({ id, pwd }) => {
  // console.log(parseInt(EMP_ID), EMP_PWD);
  return await client.post("/emp/login", {
    emp_ID: id,
    emp_PWD: pwd,
  });
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
