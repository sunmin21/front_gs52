import client from "../client";
import moment from "moment";
export const todo = async (user) => {
  const res = await client.post("/task/todo", {
    todo_RE_EMP_ID: user,
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
    todo_RE_EMP_ID: user,
  });

  return res.data;
};
export const BoardSend = async ({ no, board }) => {
  // console.log(JSON.parse(search[0]));
  console.log(no.current);
  var params = new URLSearchParams();
  params.append("board", board);
  params.append("no", no.current);
  console.log(params);
  const res = await client.get("/task/board", {
    params,
  });
  return res.data;
};
export const doneInsert = async (user) => {
  const date = moment().format("YYYY-MM-DD HH:mm:ss");

  const res = await client.post("/task/todo/Done", {
    todo_DONE: user[2],
    todo_INDEX: user[1],
    todo_RE_EMP_ID: user[0],
    todo_END_DATE: date,
  });

  return res.data;
};
// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
