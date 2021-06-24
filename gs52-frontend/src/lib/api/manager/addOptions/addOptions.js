import client from "../../client";

export const SelectDept = async () => {
  const Dept = await client.get("/manager/addoptions/dept");

  return Dept;
};

export const UpdateDept = async (index, content) => {
  console.log("타냐?");
  const Dept = await client.post("/manager/addoptions/deptUpdate", {
    dept_INDEX: index,
    dept_NAME: content,
  });

  return Dept;
};
export const DeleteDept = async (index) => {
  const Dept = await client.post("/manager/addoptions/deptDelete", {
    dept_INDEX: index,
  });

  return Dept;
};

export const SelectTeam = async () => {
  const Dept = await client.get("/manager/addoptions/team");

  return Dept;
};

export const TeamDept = async (index) => {
  const Dept = await client.post("/manager/addoptions/teamDelete", {
    team_INDEX: index,
  });

  return Dept;
};

export const DeleteTeam = async (index) => {
  const Dept = await client.post("/manager/addoptions/teamDelete", {
    dept_INDEX: index,
  });

  return Dept;
};
