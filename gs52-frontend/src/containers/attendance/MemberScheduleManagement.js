import Item from "antd/lib/list/Item";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberSchedule from "src/components/attendance/MemberSchedule/MemberSchedule";
import MemberSchedulePage from "src/components/attendance/MemberSchedule/MemberSchedulePage";
import MemberDropdown from "./../../components/attendance/MemberSchedule/MemberDropdown";
import Calendar from "src/components/attendance/MemberSchedule/calendar";
import Readonly from "src/components/attendance/MemberSchedule/Readonly";
import { empAxios, teamAxios } from "src/modules/annual/memberSchedule";
import { SelectEmp } from "src/lib/api/attendance/MemberScheduleAPI";

const MemberScheduleManagement = () => {
  const board = useSelector((state) => state.test.board);
  const dispatch = useDispatch();

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

  //Promise 푸는거
  const test = SelectEmp().then((item) => {
    //console.log(item);
  });
  //console.log(test);

  useEffect(() => {
    dispatch(teamAxios());
    dispatch(empAxios());
  }, [dispatch]);

  const member = emp.map((data) => ({
    title: data.emp_NAME,
    value: data.emp_ID,
  }));

  const data = team.map((item) => ({
    title: item.team_NAME,
    value: String(item.team_INDEX),
    key: String(item.team_INDEX),
    children: emp
      .filter((data) => data.emp_TEAM_INDEX === item.team_INDEX)
      .map((data) => ({
        title: data.emp_NAME,
        value: data.emp_ID,
        key: data.emp_ID,
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
            <MemberDropdown data={data}></MemberDropdown>
          </div>
        </div>
        <div class="row" style={{ backgroundColor: "White" }}>
          <div class="col">
            <Readonly treevalue={treevalue}></Readonly>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberScheduleManagement;
