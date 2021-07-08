import client from "../../client";

const API_URL = "http://localhost:8081";

if (localStorage.getItem("accessToken") != null) {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage
    .getItem("accessToken")
    .replace(/\"/gi, "")}`;
}

// export const SelectOkay = async () => {
//   const okay = await client.post(API_URL + "/manager/project/selectOkay");

//   return okay;
// };

export const SelectOkay = async (index) => {
  console.log(index)
  const okay = await client.post(API_URL + "/manager/project/selectOkay", {
    project_INDEX: index,
  });

  return okay;
};
