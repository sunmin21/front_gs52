import client from "../client";

const API_URL = "http://192.168.20.17:8081";
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

export const SelectOneProject = async ({ index }) => {
  const project = await client.post(
    API_URL + "/schedule/project/selectOneProject",
    {
      project_INDEX: index,
    }
  );

  return project;
};
export const SelectOneFile = async ({ index }) => {
  const project = await client.post(
    API_URL + "/schedule/project/selectOneProjectFile",
    {
      project_INDEX: index,
    }
  );

  return project;
};
export const SelectOneWith = async ({ index }) => {
  const project = await client.post(
    API_URL + "/schedule/project/selectOneProjectWith",
    {
      project_INDEX: index,
    }
  );

  return project;
};

export const DeleteHoliday = async (id) => {
  id = parseInt(id);
  // console.log("id : " + id);
  // console.log(typeof (id));

  const holiday = await client
    .post(API_URL + "/holiday/delHoliday", {
      holiday_INDEX: id,
    })
    .then(function (response) {
      // return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 항상 실행되는 부분
    });
};