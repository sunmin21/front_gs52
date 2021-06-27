import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

const Dropdown = (data) => {
  const [value, setValue] = useState(["3"]);

  const treeData = data.data;

  const onChange = (value) => {
    setValue(value);
    console.log(value);
  };

  const tProps = {
    treeData,
    value: value,
    onChange: onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  return <TreeSelect {...tProps} />;
};

export default Dropdown;
