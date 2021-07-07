import React from "react";
import Item from "antd/lib/list/Item";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessTable from "src/components/attendance/BusinessTrip/BusinessTable";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const BusinessTripManageMent = () => {
  const board = useSelector((state) => state.test.board);
  const vacation_EMP_INDEX = getCurrentUser();
  return (
    <div class="container">
      <div class="row">
        <div class="col w-100 mt-3">
          <BusinessTable
            vacation_EMP_INDEX={vacation_EMP_INDEX}
          ></BusinessTable>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BusinessTripManageMent);
