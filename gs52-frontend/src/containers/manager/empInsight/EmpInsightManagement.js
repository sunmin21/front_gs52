import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import EmpInsightList from "src/components/manager/empInsight/EmpInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import {
  businessAxios,
  entrydateAxios,
  projectAxios,
  reportAxios,
  todoAxios,
  worktimeAxios,
} from "src/modules/schedule/teamInsight";

import { teamAxios } from "src/modules/annual/memberSchedule";
import { TreeSelect } from "antd";
const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};

const PersonInsight = () => {
  const EMP_INDEX = getCurrentUser();
  const [value, setValue] = useState(1);

  const { entrydate, project, todo, business, report, worktime, team } =
    useSelector((state) => {
      return {
        entrydate: state.TeamInsight.entrydate,
        project: state.TeamInsight.project,
        todo: state.TeamInsight.todo,
        business: state.TeamInsight.business,
        report: state.TeamInsight.report,
        worktime: state.TeamInsight.worktime,
        team: state.memberSchedule.team,
      };
    });
  const dispatch = useDispatch();

  const data = team.map((item) => ({
    title: item.dept_NAME + " : " + item.team_NAME,
    value: item.team_INDEX,
  }));

  const onChange = (value) => {
    setValue(value);
  };
  useEffect(async () => {
    await dispatch(teamAxios());
    await dispatch(entrydateAxios(value));
    await dispatch(projectAxios(value));
    await dispatch(todoAxios(value));
    await dispatch(businessAxios(value));
    await dispatch(reportAxios(value));
    await dispatch(worktimeAxios(value));
  }, [dispatch, value]);
  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>관리자 인사이트</h4>
      </div>
      <div className="container">
        <div className="row" style={{ textAlign: "right" }}>
          <div className="col w-50 mt-3">
            <div>
              <TreeSelect
                style={{ width: "25%" }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                treeData={data}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col w-70">
            {entrydate.length !== 0 &&
            project.length !== 0 &&
            todo.length !== 0 &&
            business.length !== 0 &&
            report.length !== 0 &&
            worktime.length !== 0 ? (
              <EmpInsightList
                entrydate={entrydate}
                project={project}
                todo={todo}
                business={business}
                report={report}
                worktime={worktime}
              ></EmpInsightList>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PersonInsight);
