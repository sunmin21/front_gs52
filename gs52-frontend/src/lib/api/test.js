import client from "./client";

export const Home = async () => {
  const res = await client.get("/test/t");
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
