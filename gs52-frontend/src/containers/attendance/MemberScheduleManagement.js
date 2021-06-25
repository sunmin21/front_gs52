import Item from "antd/lib/list/Item";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberSchedule from "src/components/attendance/MemberSchedule/MemberSchedule";
import MemberSchedulePage from "src/components/attendance/MemberSchedule/MemberSchedulePage";
import MemberDropdown from "./../../components/attendance/MemberSchedule/MemberDropdown";
import Calendar from "src/components/attendance/MemberSchedule/calendar";
import Readonly from "src/components/attendance/MemberSchedule/Readonly";

const MemberScheduleManagement = () => {
  const board = useSelector((state) => state.test.board);
  const dispatch = useDispatch();

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
          <div class="col-sm-4 ">
            <MemberDropdown></MemberDropdown>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <Readonly></Readonly>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberScheduleManagement;
