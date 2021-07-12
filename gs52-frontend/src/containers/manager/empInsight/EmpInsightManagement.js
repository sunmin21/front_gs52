import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
      <div class="row">
        <div class="col w-100 mt-3">
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
