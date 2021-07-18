import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberDropdown from "../../components/shedule/personalSchedule/MemberDropdown";
import PersonalReadonly from "src/components/shedule/personalSchedule/PersonalReadonly";
import {
  allAxios,
  attendAxios,
  empAxios,
  teamAxios,
} from "src/modules/annual/memberSchedule";
import { SelectAttend } from "src/lib/api/attendance/MemberScheduleAPI";

import {
  leaderAxios,
  personAxios,
} from "src/modules/schedule/personSchedule/personSchedule";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};

const PersonalScheduleManagement = () => {
  const dispatch = useDispatch();

  const render = useSelector((state) => state.main.render);
  const vacation_EMP_INDEX = getCurrentUser();

  // const test = SelectTeam();
  // console.log(test);

  //리덕스에서 team 가져옴
  const { team, emp, treevalue, attend, person, leader } = useSelector(
    (state) => {
      return {
        team: state.memberSchedule.team,
        emp: state.memberSchedule.emp,
        treevalue: state.memberSchedule.treevalue,
        attend: state.memberSchedule.attend,
        person: state.personSchedule.person,
        leader: state.personSchedule.leader,
      };
    }
  );

  const nowEmpTeam = emp //현재 로그인한 사람의 팀 구하기
    .filter((item) => item.emp_INDEX === vacation_EMP_INDEX.index)
    .map((item) =>
      //String(item.emp_TEAM_INDEX);
      String(item.emp_TEAM_INDEX)
    );

  useEffect(() => {
    dispatch(allAxios());
  }, [render]);

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
  console.log(render);
  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>개인 스케줄</h4>
      </div>
      <div>
        <div className="row justify-content-end">
          <div className="col-sm-4 mb-2">
            <MemberDropdown
              data={data}
              nowEmpTeam={nowEmpTeam}
            ></MemberDropdown>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "White" }}>
          <div className="col">
            <PersonalReadonly
              treevalue={treevalue}
              data={data}
              team={team}
              emp={emp}
              attend={attend}
              person={person}
              leader={leader}
            ></PersonalReadonly>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PersonalScheduleManagement);
