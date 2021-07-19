import { CImg, CMedia } from "@coreui/react";
import { BackTop } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import WiseSays from "./WiseSays";
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};
const b = Math.floor(Math.random() * 101);

const WiseSaying = () => {
  return (
    <>
      <p>{WiseSays[b]}</p>
    </>
  );
};

export default React.memo(WiseSaying);
