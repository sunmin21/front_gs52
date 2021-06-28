import client from "../client";

export const SelectTeam = async () => {
  const team = await client.post("/member/team");

  return team;
};

export const SelectEmp = async (index) => {
  const emp = await client.post("/member/emp", {
    //개인 사원의 잔여 연차 수를 가져옴
    // emp_TEAM_INDEX: index,
  });

  return emp;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
