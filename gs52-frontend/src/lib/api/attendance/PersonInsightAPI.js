import client from "../client";

const API_URL = "http://localhost:8081";

export const SelectEmpEntryDate = async (index) => {
  const emp = await client.post(API_URL + "/insight/selectempentrydate", {
    //사원의 근속일수
    emp_INDEX: index,
  });

  return emp;
};

export const SelectProjectCount = async (index) => {
  const count = await client.post(API_URL + "/insight/selectprojectcount", {
    //사원의 근속일수
    emp_INDEX: index,
  });

  return count;
};

export const SelectTodoCount = async (index) => {
  const todo = await client.post(API_URL + "/insight/selecttodocount", {
    //사원의 근속일수
    emp_INDEX: index,
  });

  return todo;
};

export const SelectBusinessCount = async (index) => {
  const business = await client.post(API_URL + "/insight/selectbusinesscount", {
    //사원의 근속일수
    emp_INDEX: index,
  });

  return business;
};

export const SelectReportCount = async (index) => {
  const report = await client.post(API_URL + "/insight/selectreportcount", {
    //사원의 근속일수
    emp_INDEX: index,
  });

  return report;
};

export const SelectWorkTime = async (index) => {
  const time = await client.post(API_URL + "/insight/selectworktime", {
    //사원의 근속일수
    emp_INDEX: index,
  });

  return time;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
