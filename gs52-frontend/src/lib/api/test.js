import client from "./client";

export const Home = async () => {
  console.log("이거오냐");

  const res = await client.get("/test/t");

  const resa = await client.get("/annual/a");
  console.log(res.data);
  console.log(resa.data);
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
