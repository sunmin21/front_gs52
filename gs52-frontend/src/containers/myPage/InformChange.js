import React, { useState } from "react";
import InformChange from "../../components/myPage/InformChange";
const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};
const informChange = () => {
    const contentStyle = {
        backgroundColor: "#3e4b54",
        width: "400px",
        textAlign: "center",
        boxShadow: "5px 5px 5px gray",
        padding: "8px",
        borderRadius: "50px",
    };

  return (
    <div>   
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>
        회원정보수정
        </h4>
      </div>
      <InformChange></InformChange>
    </div>
  );
};

export default informChange;
