import { RFC_2822 } from "moment";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
const MemberSchedulePage = () => {
  const prev = () => {
    console.log("prev");
  };

  const next = () => {
    console.log("next");
  };
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-sm-2 " style={{ float: "none", margin: "auto" }}>
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <div class="col-sm-4">
            <h3>2021.06</h3>
          </div>
          <div class="col-sm-2" style={{ float: "none", margin: "auto" }}>
            <Button
              shape="circle"
              icon={<RightOutlined />}
              style={{
                display: "flex",

                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberSchedulePage;
