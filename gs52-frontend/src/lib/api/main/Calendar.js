// api
import client from "../client";

const API_URL = "http://localhost:8081";

export const SelectCalendar = async (emp) => {
    console.log("로그인 된 사용자: " + emp)
    console.log(API_URL)
    const calendar = await client.post(API_URL + "/mainCalendar/selectCalendar", {
        emp_INDEX: emp,
    });
    console.log("여기오니??????")
    return calendar;
};