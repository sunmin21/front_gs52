import client from "../client";

const API_URL = "http://localhost:8081";

export const SelectProceeding = async (emp) => {
  
  const proceeding = await client.post(API_URL + "/project/selectProceeding", {
    project_WITH_EMP_INDEX: emp,
  });

  return proceeding;
};

export const SelectRequested = async (emp) => {

  const requested = await client.post(API_URL + "/project/selectRequested", {
    project_WITH_EMP_INDEX: emp,
  });

  return requested;
};

export const UpdateRequested = async (pwindex, okay, reject) => {

  const uprequested = await client.post(API_URL + "/project/updateRequested", {
    project_WITH_INDEX: pwindex,
    project_WITH_OKAY: okay,
    project_WITH_REJECT: reject,
  });

  return uprequested;
};

export const SelectAsked = async (emp) => {

  const asked = await client.post(API_URL + "/project/selectAsked", {
    project_WITH_EMP_INDEX: emp,
  });

  return asked;
};