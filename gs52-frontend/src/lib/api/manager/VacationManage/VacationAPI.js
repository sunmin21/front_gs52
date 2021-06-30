import client from "../../client";

const API_URL = "http://localhost:8081";
export const SelectVacation = async (index) => {
  const vacation = await client.post(API_URL + "/vacation/select", {
    //사원의 연차정보 전부 가져옴
  });
  return vacation;
};

export const UpdateVacationStatus = async (
  count,
  vacation_INDEX,
  vacation_DATE,
  vacation_ATTEND_INFO_INDEX
) => {
  const upvacation = await client.post(API_URL + "/vacation/update", {
    count: count,
    vacation_INDEX: vacation_INDEX,
    vacation_DATE: vacation_DATE,
    vacation_ATTEND_INFO_INDEX: vacation_ATTEND_INFO_INDEX,
  });
  return upvacation;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
