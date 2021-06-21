import client from "../client";
export const userList = async () => {
  const res = await client.get("/emp/listAll");

  return res.data;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
