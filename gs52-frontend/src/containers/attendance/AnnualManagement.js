import Item from "antd/lib/list/Item";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnnualTable from "src/components/attendance/AnnualManagement/AnnualTable";

const AnnualManageMent = () => {
  const board = useSelector((state) => state.test.board);
  const dispatch = useDispatch();

  return (
    <div class="container">
      <div class="row">
        <div class="col w-100">
          <AnnualTable></AnnualTable>
        </div>
      </div>
    </div>
  );
};

export default AnnualManageMent;
