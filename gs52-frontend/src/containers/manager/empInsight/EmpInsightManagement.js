import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import React from "react";
import { useEffect, useRef, useState } from "react";
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

const PersonInsight = () => {
  const EMP_INDEX = getCurrentUser();
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  const { entrydate, project, todo, business, report, worktime } = useSelector(
    (state) => {
      console.log(state);
      return {
        entrydate: state.TeamInsight.entrydate,
        project: state.TeamInsight.project,
        todo: state.TeamInsight.todo,
        business: state.TeamInsight.business,
        report: state.TeamInsight.report,
        worktime: state.TeamInsight.worktime,
      };
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entrydateAxios(EMP_INDEX.team));
    dispatch(projectAxios(EMP_INDEX.team));
    dispatch(todoAxios(EMP_INDEX.team));
    dispatch(businessAxios(EMP_INDEX.team));
    dispatch(reportAxios(EMP_INDEX.team));
    dispatch(worktimeAxios(EMP_INDEX.team));
  }, [dispatch, EMP_INDEX.team]);
  return (
    <div class="container">
      <div class="row" style={{ textAlign: "right" }}>
        <div class="col w-50 mt-3">
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              팀 선택 &nbsp;
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
      <div class="row">
        <div class="col w-50">
          {entrydate.length !== 0 &&
          project.length !== 0 &&
          todo.length !== 0 &&
          business.length !== 0 &&
          report.length !== 0 &&
          worktime.length !== 0 ? (
            <EmpInsightList
              EMP_TEAM_INDEX={EMP_INDEX.team}
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
  );
};

export default React.memo(PersonInsight);
