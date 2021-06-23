import Item from "antd/lib/list/Item";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberSchedule from "src/components/attendance/MemberSchedule/MemberSchedule";
import MemberSchedulePage from "src/components/attendance/MemberSchedule/MemberSchedulePage";

const AnnualManageMent = () => {
  const board = useSelector((state) => state.test.board);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <div class="row">
          <div class="col">
            <MemberSchedulePage></MemberSchedulePage>
          </div>
          <MemberSchedule></MemberSchedule>
        </div>
      </div>
    </>
  );
};

export default AnnualManageMent;
