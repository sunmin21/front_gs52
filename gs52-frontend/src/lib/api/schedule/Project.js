import client from "../client";

const API_URL = "http://localhost:8081";
export const InsertProject = async (regiInfo) => {
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

export const UpdateProject = async (regiInfo) => {
  // console.log("test");

  const project = await client.post(
    API_URL + "/schedule/project/updateproject",
    regiInfo,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return project;
};
export const UpdateProjectWith = async ({ color, withIndex }) => {
  const project = await client.post(
    API_URL + "/schedule/project/updateprojectWith",
    {
      project_WITH_INDEX: withIndex,
      project_WITH_COLOR: color,
    }
  );

  return project;
};

export const SelectTask = async ({ index }) => {
  const project = await client.post(API_URL + "/schedule/project/selectTask", {
    project_INDEX: index,
  });

  return project;
};
export const InsertProjecTask = async ({ 인덱스, 내용, 진행도 }) => {
  const project = await client.post(
    API_URL + "/schedule/project/insertProjectTodo",
    {
      project_INDEX: 인덱스,
      project_TASK_CONTENT: 내용,
      project_TASK_PERCENT: 진행도,
    }
  );

  return project;
};
export const UpdateProjecTask = async ({
  task인덱스,
  인덱스,
  내용,
  진행도,
}) => {
  console.log(인덱스, 내용, 진행도);
  const project = await client.post(
    API_URL + "/schedule/project/updateProjectTodo",
    {
      project_INDEX: 인덱스,
      project_TASK_INDEX: task인덱스,
      project_TASK_CONTENT: 내용,
      project_TASK_PERCENT: 진행도,
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
