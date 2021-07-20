import React, { useState } from "react";
import PwdChange from "../../components/myPage/PwdChange";
const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};
const pwdChange = () => {
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
            비밀번호수정
        </h4>
      </div><br/><br/>
      <PwdChange></PwdChange>
    </div>
  );
};

export default pwdChange;
