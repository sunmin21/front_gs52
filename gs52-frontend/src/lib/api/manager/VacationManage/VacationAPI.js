import client from "../../client";

client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("accessToken").replace(/\"/gi, "")}`;
const API_URL = "http://localhost:8081";
export const SelectVacation = async (index) => {
  const vacation = await client.post(API_URL + "/manager/vacation/select", {
    //사원의 연차정보 전부 가져옴
  });
  return vacation;
};

export const UpdateVacationStatus = async (
  count,
  vacation_INDEX,
  vacation_DATE,
  vacation_ATTEND_INFO_INDEX,
  vacation_EMP_INDEX
) => {
  const upvacation = await client.post(API_URL + "/manager/vacation/update", {
    count: count,
    vacation_INDEX: vacation_INDEX,
    vacation_DATE: vacation_DATE,
    vacation_ATTEND_INFO_INDEX: vacation_ATTEND_INFO_INDEX,
    vacation_EMP_INDEX: vacation_EMP_INDEX,
  });
  return upvacation;
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
