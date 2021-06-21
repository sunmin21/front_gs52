import client from "./client";

export const Home = async () => {
  console.log("이거오냐");

  const res = await client.get("/holiday/h");
  console.log(res.data);

  // const conf = await client.get("/schedule/confRoom/select");
  // console.log(conf.data);
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
