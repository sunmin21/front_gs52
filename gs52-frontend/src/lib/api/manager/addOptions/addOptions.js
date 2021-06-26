import client from "../../client";

export const SelectDept = async () => {
  const Dept = await client.get("/manager/addoptions/dept");

  return Dept;
};

export const UpdateDept = async (index, content) => {
  const Dept = await client.post("/manager/addoptions/deptUpdate", {
    dept_INDEX: index,
    dept_NAME: content,
  });

  return Dept;
};
export const InsertDept = async (content) => {
  const Dept = await client.post("/manager/addoptions/deptInsert", {
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
  console.log(index);
  const Dept = await client.post("/manager/addoptions/teamDelete", {
    team_INDEX: index,
  });

  return Dept;
};

export const UpdateTeam = async ({ teamname, work_RULE_INDEX, index }) => {
  console.log(teamname);
  console.log(work_RULE_INDEX);

  const Dept = await client.post("/manager/addoptions/teamUpdate", {
    team_WORK_TYPE: work_RULE_INDEX,
    team_NAME: teamname,
    team_INDEX: index,
  });

  return Dept;
};

export const InsertTeam = async ({ 부서인덱스, 팀이름, 근무유형 }) => {
  const Dept = await client.post("/manager/addoptions/teamInsert", {
    team_DEPT_INDEX: 부서인덱스,
    team_NAME: 팀이름,
    team_WORK_TYPE: 근무유형,
  });

  return Dept;
};

export const SelectWorkRule = async () => {
  const Dept = await client.get("/manager/addoptions/workRule");

  return Dept;
};

export const SelectWorkType = async () => {
  const Dept = await client.get("/manager/addoptions/workType");

  return Dept;
};

export const UpdateWorkRule = async ({
  work_type_index,
  index,

  work_rule_name,
  starttime,
  endtime,
  work_rule_avg_time,
  breaktime,
}) => {
  const Dept = await client.post("/manager/addoptions/workRuleUpdate", {
    work_RULE_INDEX: index,
    work_RULE_WORK_TYPE_INDEX: work_type_index,
    work_RULE_NAME: work_rule_name,
    work_RULE_START: starttime,
    work_RULE_END: endtime,
    work_RULE_AVG_HOUR: work_rule_avg_time,
    work_RULE_BREAK: breaktime,
  });

  return Dept;
};

export const DeleteWorkRule = async (index) => {
  console.log(index);
  const Dept = await client.post("/manager/addoptions/workRuleDelete", {
    work_RULE_INDEX: index,
  });

  return Dept;
};
export const InsertWorkRule = async ({
  work_type_index,
  work_rule_name,
  starttime,
  endtime,
  work_rule_avg_time,
  breaktime,
}) => {
  const Dept = await client.post("/manager/addoptions/workRuleInsert", {
    work_RULE_WORK_TYPE_INDEX: work_type_index,
    work_RULE_NAME: work_rule_name,
    work_RULE_START: starttime,
    work_RULE_END: endtime,
    work_RULE_AVG_HOUR: work_rule_avg_time,
    work_RULE_BREAK: breaktime,
  });

  return Dept;
};
