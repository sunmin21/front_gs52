import client from "../../client";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

// const API_URL = "http://http://localhost:8081";
const API_URL = "http://localhost:8081";

const user = getCurrentUser();
  
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

export const SelectOkay = async (index) => {
  if (user.roles == "ROLE_ADMIN") {
     const okay = await client.post(API_URL + "/manager/project/selectOkay", {
    project_INDEX: index,
     });
    
  console.log(okay)
  return okay;
  }
  else if (user.roles == "ROLE_TEAMLEADER") {
    
  }

};

export const UpdateOKay = async (index, okay) => {
  const upokay = await client.post(API_URL + "/manager/project/updateOkay", {
    project_INDEX: index,
    project_OKAY: okay,
  });

  return upokay;
};
