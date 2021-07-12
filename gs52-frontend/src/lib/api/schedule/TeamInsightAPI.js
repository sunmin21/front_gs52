import client from "../client";

const API_URL = "http://localhost:8081";

export const SelectTeamEntryDate = async (index) => {
  const emp = await client.post(API_URL + "/insight/selectteamentrydate", {
    //사원의 근속일수
    emp_TEAM_INDEX: index,
  });

  return emp;
};

export const SelectTeamProject = async (index) => {
  const project = await client.post(API_URL + "/insight/selectteamproject", {
    //사원의 근속일수
    emp_TEAM_INDEX: index,
  });

  return project;
};

export const SelectTeamTodo = async (index) => {
  const todo = await client.post(API_URL + "/insight/selectteamtodo", {
    //사원의 근속일수
    emp_TEAM_INDEX: index,
  });

  return todo;
};

export const SelectTeamBusiness = async (index) => {
  const business = await client.post(API_URL + "/insight/selectteambusiness", {
    //사원의 근속일수
    emp_TEAM_INDEX: index,
  });

  return business;
};

export const SelectTeamReport = async (index) => {
  const report = await client.post(API_URL + "/insight/selectteamreport", {
    //사원의 근속일수
    emp_TEAM_INDEX: index,
  });

  return report;
};

export const SelectTeamWorkTime = async (index) => {
  const worktime = await client.post(API_URL + "/insight/selectteamworktime", {
    //사원의 근속일수
    emp_TEAM_INDEX: index,
  });

  return worktime;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
