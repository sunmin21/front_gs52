import React, { useState } from "react";
import MyPage from "../../../components/main/myPage/MyPage";
const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};
const InformLayout = () => {
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
            마이페이지
        </h4>
      </div><br/><br/>
      <MyPage></MyPage>
    </div>
  );
};

export default InformLayout;
