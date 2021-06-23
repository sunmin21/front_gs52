import client from "../../client";

export const SelectDept = async () => {
  const Dept = await client.get("/manager/addoptions/dept");

  return Dept;
};
export const DeleteDept = async (index) => {
  const Dept = await client.post("/manager/addoptions/deptDelete", {
    dept_INDEX: index,
  });

  return Dept;
};
