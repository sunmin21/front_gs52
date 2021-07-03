import client from "../client";

const API_URL = "http://localhost:8081";

export const SelectProceeding = async ({ emp }) => {
    const proceeding = await client.post(API_URL + "/project/selectProceeding", {
    PROJECT_WITH_EMP_INDEX: emp
    })

    return proceeding;
}