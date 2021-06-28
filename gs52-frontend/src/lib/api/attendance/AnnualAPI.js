import client from "../client";

const API_URL = "http://localhost:8081";
export const SelectVacation = async (index) => {
  const annual = await client.post(API_URL + "/annual/select", {
    //사원의 연차정보 전부 가져옴
    vacation_EMP_INDEX: index,
  });
  console.log(annual);

  return annual;
};

export const SelectEmpVacation = async (index) => {
  const empvacation = await client.post(API_URL + "/annual/select2", {
    //개인 사원의 잔여 연차 수를 가져옴
    vacation_EMP_INDEX: index,
  });

  return empvacation;
};

export const DeleteVacation = async (event) => {
  const empvacation = await client.post(API_URL + "/annual/delete", {
    vacation_DATE: event,
  });

  return empvacation;
};

export const UpdateVacation = async (count, emp_ID) => {
  const upvacation = await client.post(API_URL + "/annual/update", {
    count: count,
    emp_ID: emp_ID,
  });
  return upvacation;
};

export const InserVacation = async (
  vacation_EMP_INDEX,
  infoindex,
  date,
  contents
) => {
  const insertvaction = await client
    .post(API_URL + "/annual/insert", {
      vacation_EMP_INDEX: vacation_EMP_INDEX,
      vacation_ATTEND_INFO_INDEX: infoindex,
      vacation_DATE: date,
      vacation_CONTENTS: contents,
    })
    .then(function (response) {
      //response
    })
    .catch(function (error) {
      //오류발생 시
      console.log(error);
    })
    .then(function () {
      //항상실행
    });
  return insertvaction;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
