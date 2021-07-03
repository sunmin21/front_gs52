import client from "../client";

const API_URL = "http://localhost:8081";
export const InsertProject = async (regiInfo) => {
  // console.log("test");

  const project = await client.post(
    API_URL + "/schedule/project/insertproject",
    regiInfo,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return project;
};

export const SelectProceeding = async ({ emp }) => {
  
  const proceeding = await client.post(API_URL + "/project/selectProceeding", {
    PROJECT_WITH_EMP_INDEX: emp
  })

  return proceeding;
}