import client from "../../client";

const API_URL = "http://192.168.20.17:8081";

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
  const okay = await client.post(API_URL + "/manager/project/selectOkay", {
    project_INDEX: index,
  });

  return okay;
};

export const UpdateOKay = async (index, okay) => {
  console.log("index : " + index + "okay : " + okay);
  const upokay = await client.post(API_URL + "/manager/project/updateOkay", {
    project_INDEX: index,
    project_OKAY: okay,
  });

  return upokay;
};
