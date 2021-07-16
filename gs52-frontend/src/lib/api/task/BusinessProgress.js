import client from "../client";
import moment from "moment";

const API_URL = "http://192.168.20.17:8081";
export const todo = async (user) => {
  const res = await client.post(API_URL + "/task/todo", {
    todo_RE_EMP_INDEX: user["todo_RE_EMP_ID"],
  });

  return res;
};

export const send = async (user) => {
  const res = await client.post(API_URL + "/task/send", {
    todo_EMP_INDEX_SEND: user["todo_EMP_ID_SEND"],
  });

  return res;
};
export const success = async (user) => {
  const res = await client.post(API_URL + "/task/success", {
    todo_RE_EMP_INDEX: user["todo_RE_EMP_ID"],
  });

  return res;
};
export const BoardSend = async ({ no, board, sendId }) => {
  const startDate = moment().format("YYYY-MM-DD HH:mm:ss");

  var params = new URLSearchParams();
  params.append("board", board);
  params.append("no", no.current);
  params.append("sendId", sendId);
  params.append("startDate", startDate);

  const res = await client.get(API_URL + "/task/board", {
    params,
  });
  return res.data;
};
export const doneInsert = async (user) => {
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(user);
  const res = await client.post(API_URL + "/task/todo/Done", {
    todo_DONE: user[2],
    todo_INDEX: user[1],
    todo_RE_EMP_INDEX: user[0],
    todo_END_DATE: date,
  });

  return res.data;
};
// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
