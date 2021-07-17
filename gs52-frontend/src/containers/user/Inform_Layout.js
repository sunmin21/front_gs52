import React, { useState } from "react";
import InformField from "../../components/user/Inform_Field";
const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};
const InformLayout = () => {
  return (
    <div>   
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>
            회원정보 수정
        </h4>
      </div><br/>
      <InformField></InformField>
    </div>
  );
};

export default InformLayout;
