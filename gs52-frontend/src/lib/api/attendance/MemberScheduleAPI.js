import client from "../client";

const API_URL = "http://192.168.20.17:8081";
export const SelectTeam = async () => {
  const team = await client.post(API_URL + "/member/team");

  return team;
};

export const SelectEmp = async (index) => {
  const emp = await client.post(API_URL + "/member/emp", {
    //개인 사원의 잔여 연차 수를 가져옴
    // emp_TEAM_INDEX: index,
  });

  return emp;
};

export const SelectAttend = async (index) => {
  const attend = await client.post(API_URL + "/member/attend");
  return attend;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
