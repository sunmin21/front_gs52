import client from "../../client";

// const API_URL = "http://http://localhost:8081";
const API_URL = "http://192.168.20.17:8081";

if (localStorage.getItem("accessToken") != null) {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage
    .getItem("accessToken")
    .replace(/\"/gi, "")}`;
}

// export const SelectOkay = async () => {
//   console.log(user)
//   const okay = await client.post(API_URL + "/manager/project/selectOkay");

//   return okay;
// };

export const SelectOkay = async (param) => {
  if (param.roles == "ROLE_ADMIN") {
    const okay = await client.post(API_URL + "/manager/project/selectOkay", {
      project_INDEX: param.index,
    });

    return okay;
  } else if (param.roles == "ROLE_TEAMLEADER") {
    console.log("@#!@$");

    const okay = await client.post(
      API_URL + "/manager/project/selectOkay_teamLeader",
      {
        project_WITH_LEADER: param.index,
      }
    );
    return okay;
  }
};

export const SelectAll = async (roles, index) => {
  if (roles == "ROLE_ADMIN") {
    const okay = await client.post(API_URL + "/manager/project/selectAll", {
      project_INDEX: index,
    });

    return okay;
  }
};

export const UpdateOKay = async (index, okay) => {
  const upokay = await client.post(API_URL + "/manager/project/updateOkay", {
    project_INDEX: index,
    project_OKAY: okay,
  });

  return upokay;
};
