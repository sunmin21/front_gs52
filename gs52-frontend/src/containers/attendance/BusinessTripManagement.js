import Item from "antd/lib/list/Item";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessTable from "src/components/attendance/BusinessTrip/BusinessTable";

const AnnualManageMent = () => {
  const board = useSelector((state) => state.test.board);
  const vacation_EMP_INDEX = useRef(5);
  return (
    <div class="container">
      <div class="row">
        <div class="col w-100">
          <BusinessTable
            vacation_EMP_INDEX={vacation_EMP_INDEX}
          ></BusinessTable>
        </div>
      </div>
    </div>
  );
};

export default AnnualManageMent;
