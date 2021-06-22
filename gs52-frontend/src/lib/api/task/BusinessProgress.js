import client from "../client";
import moment from "moment";
export const todo = async (user) => {
  console.log("타냐234");
  const res = await client.post("/task/todo", {
    todo_RE_EMP_ID: user["todo_RE_EMP_ID"],
  });

  return res;
};

export const send = async (user) => {
  const res = await client.post("/task/send", {
    todo_EMP_ID_SEND: user["todo_EMP_ID_SEND"],
  });

  return res;
};
export const success = async (user) => {
  const res = await client.post("/task/success", {
    todo_RE_EMP_ID: user["todo_RE_EMP_ID"],
  });

  return res;
};
export const BoardSend = async ({ no, board, sendId }) => {
  // console.log(JSON.parse(search[0]));
  console.log("하니?");
  const startDate = moment().format("YYYY-MM-DD HH:mm:ss");

  var params = new URLSearchParams();
  params.append("board", board);
  params.append("no", no.current);
  params.append("sendId", sendId);
  params.append("startDate", startDate);

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
