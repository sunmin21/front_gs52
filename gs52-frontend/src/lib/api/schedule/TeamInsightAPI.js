import client from "../client";

const API_URL = "http://localhost:8081";

export const SelectTeamEntryDate = async (index) => {
  const emp = await client.post(API_URL + "/insight/selectteamentrydate", {
    //사원의 근속일수
    emp_TEAM_INDEX: index,
  });

  return emp;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
