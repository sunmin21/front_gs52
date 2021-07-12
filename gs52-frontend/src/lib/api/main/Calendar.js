// api
import client from "../client";

const API_URL = "http://localhost:8081";

export const SelectCalendar = async (emp) => {
    const calendar = await client.post(API_URL + "/mainCalendar/selectCalendar", {
        emp_INDEX: emp,
    });
    return calendar;
};

export const SelectCalendar2 = async (emp) => {
    const calendar2 = await client.post(API_URL + "/mainCalendar/selectCalendar2", {
        emp_INDEX: emp,
    });
    return calendar2;
};

export const SelectCalendar3 = async (emp) => {
    const calendar3 = await client.post(API_URL + "/mainCalendar/selectCalendar3", {
        emp_INDEX: emp,
    });
    return calendar3;
};