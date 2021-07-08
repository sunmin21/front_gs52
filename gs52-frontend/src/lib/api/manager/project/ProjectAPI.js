import client from "../../client";

const API_URL = "http://localhost:8081";

export const SelectOkay = async (index) => {
    const okay = await client.post(API_URL + "/manager/project/selectOkay", {
        project_INDEX: index,
    });

    return okay;
};