import client from "../client";
import moment from "moment";
export const todo = async (user) => {
  const res = await client.post("/task/todo", {
    todo_EMP_ID_RECEIVCE: user,
  });

  return res.data;
};

export const send = async (user) => {
  const res = await client.post("/task/send", {
    todo_EMP_ID_SEND: user,
  });

  return res.data;
};
export const success = async (user) => {
  const res = await client.post("/task/success", {
    todo_EMP_ID_SEND: user,
  });

  return res.data;
};

export const doneInsert = async (user) => {
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(date);
  const res = await client.post("/task/todo/Done", {
    todo_DONE: user[2],
    todo_INDEX: user[1],
    todo_EMP_ID_RECEIVCE: user[0],
    todo_END_DATE: date,
  });

  return res.data;
};
// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
