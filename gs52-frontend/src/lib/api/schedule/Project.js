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
  console.log("이거안가?@?");
  console.log("무슨차이야 ㅡㅡ");

  const project = await client.post(API_URL + "/schedule/project/selectTask", {
    project_INDEX: index,
  });

  return project;
};

export const SelectTaskDetail = async ({ index }) => {
  console.log("왜여기로안가죠???????????????????????????????@");
  const project = await client.post(
    API_URL + "/schedule/project/selectTaskDetail",
    {
      project_INDEX: index,
    }
  );

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

export const DeleteProjecTaskAll = async (인덱스) => {
  console.log(인덱스);
  const project = await client.post(
    API_URL + "/schedule/project/deleteProjecTaskAll",
    {
      project_TASK_INDEX: 인덱스,
    }
  );

  return project;
};
export const DeleteProjecTask = async (인덱스) => {
  console.log(인덱스);
  const project = await client.post(
    API_URL + "/schedule/project/deleteProjectTask",
    {
      project_TASK_INDEX: 인덱스,
    }
  );

  return project;
};

export const InsertProjecTaskDetail = async ({
  task인덱스,
  담당자,
  내용,
  진행도,
  인덱스,
}) => {
  console.log(task인덱스 + "  " + 담당자 + "  " + 내용 + "  " + 진행도);
  const project = await client.post(
    API_URL + "/schedule/project/insertprojectTaskDetail",
    {
      project_TASK_INDEX: task인덱스,
      project_TASK_DETAIL_CONTENT: 내용,
      project_TASK_DETAIL_PERCENT: 진행도,
      project_TASK_DETAIL_EMP: 담당자,
      project_INDEX: 인덱스,
    }
  );

  return project;
};
export const UpdateProjecTaskDetail = async ({
  task인덱스,
  detail인덱스,
  담당자,
  내용,
  진행도,
  인덱스,
}) => {
  console.log(task인덱스 + "  " + 담당자 + "  " + 내용 + "  " + 진행도);
  const project = await client.post(
    API_URL + "/schedule/project/updateprojectTaskDetail",
    {
      project_TASK_DETAIL_INDEX: detail인덱스,
      project_TASK_INDEX: task인덱스,
      project_TASK_DETAIL_CONTENT: 내용,
      project_TASK_DETAIL_PERCENT: 진행도,
      project_TASK_DETAIL_EMP: 담당자,
      project_INDEX: 인덱스,
    }
  );

  return project;
};
export const DeleteProjecTaskDetail = async (인덱스) => {
  console.log(인덱스);
  const project = await client.post(
    API_URL + "/schedule/project/deleteProjectTaskDetail",
    {
      project_TASK_DETAIL_INDEX: 인덱스,
    }
  );

  return project;
};
export const UpdateProjecTaskDetailSuccess = async ({ index, success }) => {
  console.log(success);
  console.log("타냐");
  const project = await client.post(
    API_URL + "/schedule/project/updateProjecTaskDetailSuccess",
    {
      project_TASK_DETAIL_INDEX: index,
      project_TASK_DETAIL_SUCCESS: success,
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
