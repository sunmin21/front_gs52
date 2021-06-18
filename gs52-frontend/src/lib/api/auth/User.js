import client from "../client";
import moment from "moment";
export const userList = async () => {
  const res = await client.get("/task/todo");

  return res.data;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
