import React from "react";
import { useEffect } from "react";
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
const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};

const MemberScheduleManagement = () => {
  const dispatch = useDispatch();
  const vacation_EMP_INDEX = getCurrentUser();

  useEffect(() => {
    dispatch(teamAxios());
    dispatch(empAxios());
    dispatch(attendAxios());
  }, [dispatch]);

  //리덕스에서 team 가져옴
  const { team } = useSelector((state) => {
    return {
      team: state.memberSchedule.team,
    };
  });

  //리덕스에서 emp 가져옴
  const { emp } = useSelector((state) => {
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
    .map((item) => String(item.emp_TEAM_INDEX));

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
  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>구성원 스케줄</h4>
      </div>
      <div>
        <div className="row justify-content-end">
          <div className="col-sm-4 mb-2 mr-3">
            <MemberDropdown
              style={{ borderRadius: "40px 80px" }}
              data={data}
              nowEmpTeam={nowEmpTeam}
              emp={vacation_EMP_INDEX.team}
            ></MemberDropdown>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "White" }}>
          <div className="col">
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
