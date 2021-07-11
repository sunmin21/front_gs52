import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberDropdown from "./../../components/attendance/MemberSchedule/MemberDropdown";
import MemberReadonly from "src/components/attendance/MemberSchedule/MemberReadonly";
import {
  attendAxios,
  empAxios,
  teamAxios,
} from "src/modules/annual/memberSchedule";
import { SelectAttend } from "src/lib/api/attendance/MemberScheduleAPI";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const MemberScheduleManagement = () => {
  const dispatch = useDispatch();
  const vacation_EMP_INDEX = getCurrentUser();

  useEffect(() => {
    dispatch(teamAxios());
    dispatch(empAxios());
    dispatch(attendAxios());
  }, [dispatch]);

  // const test = SelectTeam();
  // console.log(test);
  //리덕스에서 team 가져옴
  const { team } = useSelector((state) => {
    return {
      team: state.memberSchedule.team,
    };
  });

  //리덕스에서 emp 가져옴
  const { emp } = useSelector((state) => {
    // console.log(state);

    return {
      emp: state.memberSchedule.emp,
    };
  });
  //리덕스에서 tree 값 받아옴
  const { treevalue } = useSelector((state) => {
    return {
      treevalue: state.memberSchedule.treevalue,
    };
  });

  const { attend } = useSelector((state) => {
    return {
      attend: state.memberSchedule.attend,
    };
  });

  const nowEmpTeam = emp //현재 로그인한 사람의 팀 구하기
    .filter((item) => item.emp_INDEX === vacation_EMP_INDEX.index)
    .map((item) =>
      //String(item.emp_TEAM_INDEX);
      String(item.emp_TEAM_INDEX)
    );
  //Promise 푸는거
  const test = SelectAttend().then((item) => {
    //console.log(item);
  });

  //console.log(test);

  const data = team.map((item) => ({
    title: item.dept_NAME + " : " + item.team_NAME,
    value: String(item.team_INDEX),
    key: String(item.team_INDEX),
    children: emp
      .filter((data) => data.emp_TEAM_INDEX === item.team_INDEX)
      .map((data) => ({
        title: data.emp_NAME,
        value: data.emp_ID,
        key: data.emp_ID,
        team: String(data.emp_TEAM_INDEX),
      })),
  }));
  console.log(data);
  return (
    <>
      <div>
        <div class="row justify-content-end">
          <div class="col-sm-4 mb-2 mr-3">
            <MemberDropdown
              style={{ borderRadius: "40px 80px" }}
              data={data}
              nowEmpTeam={nowEmpTeam}
              emp={vacation_EMP_INDEX.team}
            ></MemberDropdown>
          </div>
        </div>
        <div class="row" style={{ backgroundColor: "White" }}>
          <div class="col">
            <MemberReadonly
              treevalue={treevalue}
              data={data}
              team={team}
              emp={emp}
              attend={attend}
            ></MemberReadonly>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(MemberScheduleManagement);
