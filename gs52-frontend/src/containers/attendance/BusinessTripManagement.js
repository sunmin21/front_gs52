import React from "react";

import { useSelector } from "react-redux";
import BusinessTable from "src/components/attendance/BusinessTrip/BusinessTable";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};

const BusinessTripManageMent = () => {
  const board = useSelector((state) => state.test.board);
  const vacation_EMP_INDEX = getCurrentUser();
  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>출장 / 외근 신청</h4>
      </div>
      <div className="container">
        <div className="row">
          <div className="col w-100 mt-3">
            <BusinessTable
              vacation_EMP_INDEX={vacation_EMP_INDEX}
            ></BusinessTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(BusinessTripManageMent);
