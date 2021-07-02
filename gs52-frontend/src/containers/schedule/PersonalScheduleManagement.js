import Item from "antd/lib/list/Item";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberDropdown from "../../components/shedule/personalSchedule/MemberDropdown";
import Readonly from "src/components/shedule/personalSchedule/Readonly";
import {
  attendAxios,
  empAxios,
  teamAxios,
} from "src/modules/annual/memberSchedule";
import { SelectAttend } from "src/lib/api/attendance/MemberScheduleAPI";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const MemberScheduleManagement = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.test.board);
  const vacation_EMP_INDEX = useRef(4);

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
    .filter((item) => item.emp_INDEX === vacation_EMP_INDEX.current)
    .map((item) =>
      //String(item.emp_TEAM_INDEX);
      String(item.emp_TEAM_INDEX)
    );
  //Promise 푸는거
  const test = SelectAttend().then((item) => {
    //console.log(item);
  });

  console.log(nowEmpTeam);

  //console.log(test);

  useEffect(() => {
    dispatch(teamAxios());
    dispatch(empAxios());
    dispatch(attendAxios());
  }, [dispatch]);

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
      {/* <div class="container">
        <div class="row">
          <div class="col">
            <MemberSchedulePage></MemberSchedulePage>
          </div>
          <div class="col mb-3">
            <MemberDropdown></MemberDropdown>
          </div>

          <MemberSchedule></MemberSchedule>
        </div>
      </div> */}
      <div>
        <div class="row justify-content-end">
          <div class="col-sm-4 mb-2">
            <MemberDropdown
              data={data}
              nowEmpTeam={nowEmpTeam}
            ></MemberDropdown>
          </div>
        </div>
        <div class="row" style={{ backgroundColor: "White" }}>
          <div class="col">
            <Readonly
              treevalue={treevalue}
              data={data}
              team={team}
              emp={emp}
              attend={attend}
            ></Readonly>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberScheduleManagement;
